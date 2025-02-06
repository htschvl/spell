import { generateSigner, publicKey as createPublicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { fetchCandyMachine, mintV2, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
// import { mplCandyGuard } from '@metaplex-foundation/mpl-candy-guard';
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'

import '../styles/BuyNFTButton.scss';

const BuyNFTButton = () => {
    const { publicKey, signTransaction, signAllTransactions } = useWallet();
    const QUICKNODE_RPC = 'https://quick-side-gas.solana-devnet.quiknode.pro/abcf0c14dc61b97348f4ad07b4fa4b8c3a686a1b';
    const CANDY_MACHINE_ADDRESS = '48ijMjApmJiym6n8NQYrAhzBpBfoUjZPj9ya1tifsjQZ';
    // const NFT_MINT_ADDRESS = 'mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9'
    
    const umi = createUmi(QUICKNODE_RPC)
                .use(mplTokenMetadata())
                .use(mplCandyMachine())

    if (publicKey && signTransaction && signAllTransactions) {
        umi.use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }));
    }

    const mintNFT = async () => {
        const candyMachineAddress = createPublicKey(CANDY_MACHINE_ADDRESS)
        const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
        
        const nftMint = generateSigner(umi);

        console.log('candyMachine', candyMachine);
        console.log('nftMint', nftMint);

        try {
            await transactionBuilder()
              .add(setComputeUnitLimit(umi, { units: 1000000 }))
              .add(
                mintV2(umi, {
                    candyMachine: candyMachine.publicKey,
                    nftMint: nftMint,
                    collectionMint: candyMachine.collectionMint,
                    collectionUpdateAuthority: candyMachine.authority,
                    candyGuard: candyMachine.mintAuthority
                })
              )
              .sendAndConfirm(umi);

              console.log('NFT minted successfully');
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