import { generateSigner, publicKey as createPublicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { fetchCandyMachine, mintV2, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'
import { useState, useEffect } from 'react';

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

    const [itemsAvailable, setItemsAvailable] = useState<number>(0);
    
    const fetchCandyMachineState = async () => {
        try {
            const candyMachineAddress = createPublicKey(CANDY_MACHINE_ADDRESS);
            const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
            const availableItems = candyMachine.items.filter(item => !item.minted).length;
            setItemsAvailable(availableItems);
        } catch (error) {
            console.error('Error fetching candy machine state:', error);
        }
    };

    useEffect(() => {
        fetchCandyMachineState();
    }, []);

    const mintNFT = async () => {
        try {
            const candyMachineAddress = createPublicKey(CANDY_MACHINE_ADDRESS)
            const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
            
            console.log('Candy Machine:', candyMachine);
            
            const nftMint = generateSigner(umi);
            
            const mintTransaction = transactionBuilder()
                .add(setComputeUnitLimit(umi, { units: 1000000 }))
                .add(
                    mintV2(umi, {
                        candyMachine: candyMachine.publicKey,
                        nftMint: nftMint.publicKey,
                        collectionMint: candyMachine.collectionMint,
                        collectionUpdateAuthority: candyMachine.authority,
                        mintArgs: {
                            groups: undefined
                        }
                    })
                );

            const signature = await mintTransaction.sendAndConfirm(umi)
            
            console.log('NFT minted successfully', signature);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    }

    return (
        <>
            {itemsAvailable > 0 ? (
                <button className="buy-nft" onClick={mintNFT}>
                    Cast a Spell
                    <div className="buy-nft--remaining-nfts">({itemsAvailable} remaining)</div>
                </button>
            ) : (
                <div className="buy-nft--sold-out">Sold out!</div>
            )}
        </>
    );
}

export default BuyNFTButton;