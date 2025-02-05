import { generateSigner, publicKey as createPublicKey, transactionBuilder, some } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { fetchDigitalAsset, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { create, fetchCandyMachine, getMplCandyGuardErrorFromName, mintFromCandyMachineV2, mintV2, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { clusterApiUrl } from '@solana/web3.js';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

import '../styles/BuyNFTButton.scss';

const BuyNFTButton = () => {
    const { publicKey, signTransaction, signAllTransactions } = useWallet();

    const umi = createUmi(clusterApiUrl('devnet'))
                .use(mplTokenMetadata())
                .use(mplCandyMachine())

    if (publicKey && signTransaction && signAllTransactions) {
        umi.use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }));
    }

    const mintNFT = async () => {
        const candyMachineAddress = createPublicKey('48ijMjApmJiym6n8NQYrAhzBpBfoUjZPj9ya1tifsjQZ')
        const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
        
        const nftMint = generateSigner(umi);
        const nftOwner = generateSigner(umi).publicKey;
        const collectionNft = fetchDigitalAsset(umi, candyMachine.collectionMint);

        try {
            await transactionBuilder()
              .add(setComputeUnitLimit(umi, { units: 1000000 }))
              .add(
                mintFromCandyMachineV2(umi, {
                    candyMachine: candyMachine.publicKey,
                    mintAuthority: umi.identity,
                    nftOwner,
                    nftMint,
                    collectionMint: (await collectionNft).publicKey,
                    collectionUpdateAuthority: (await collectionNft).metadata.updateAuthority,
                  })
              )
              .sendAndConfirm(umi);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    }

    return (
        <button className="buy-nft" onClick={mintNFT}>
            Cast a Spell
        </button>
    );
}

export default BuyNFTButton;