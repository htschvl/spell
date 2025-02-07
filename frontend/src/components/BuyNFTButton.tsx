import { generateSigner, publicKey as createPublicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { fetchCandyMachine, mintV2, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'

import '../styles/BuyNFTButton.scss';

const BuyNFTButton = () => {
    const { publicKey, signTransaction, signAllTransactions } = useWallet();
    const QUICKNODE_RPC = 'https://quick-side-gas.solana-devnet.quiknode.pro/abcf0c14dc61b97348f4ad07b4fa4b8c3a686a1b';
    const CANDY_MACHINE_ADDRESS = '48ijMjApmJiym6n8NQYrAhzBpBfoUjZPj9ya1tifsjQZ';
    
    const umi = createUmi(QUICKNODE_RPC)
                .use(mplTokenMetadata())
                .use(mplCandyMachine())

    if (publicKey && signTransaction && signAllTransactions) {
        umi.use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }));
    }

    const mintNFT = async () => {
        try {
            const candyMachineAddress = createPublicKey(CANDY_MACHINE_ADDRESS)
            const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
            
            console.log('candyMachine', candyMachine);
            
            const nftMint = generateSigner(umi);
            
            const mintTransaction = transactionBuilder()
                .add(setComputeUnitLimit(umi, { units: 1000000 }))
                .add(
                    mintV2(umi, {
                        candyMachine: candyMachine.publicKey,
                        nftMint: nftMint,
                        collectionMint: candyMachine.collectionMint,
                        collectionUpdateAuthority: candyMachine.authority,
                        tokenStandard: 4, // NonFungible
                        mintArgs: {}
                    })
                );

            const signature = await mintTransaction.sendAndConfirm(umi)
            console.log('NFT minted successfully', signature);
            
        } catch (error: any) {
            console.error('Error minting NFT:', error);
            if (error.logs) {
                console.log('Error logs:', error.logs);
            }
        }
    }

    return (
        <button className="buy-nft" onClick={mintNFT}>
            Cast a Spell
        </button>
    );
}

export default BuyNFTButton;