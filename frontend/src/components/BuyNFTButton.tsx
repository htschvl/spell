import { generateSigner, publicKey as createPublicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { fetchCandyMachine, mintV2, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'
import { useState, useEffect } from 'react';
import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

import Modal from './Modal';

import '../styles/BuyNFTButton.scss';
import empressImage from '../assets/empress.jpg';

const BuyNFTButton = () => {
    const { publicKey, signTransaction, signAllTransactions } = useWallet();
    const QUICKNODE_RPC = 'https://quick-side-gas.solana-devnet.quiknode.pro/abcf0c14dc61b97348f4ad07b4fa4b8c3a686a1b';
    // const CANDY_MACHINE_ADDRESS = '48ijMjApmJiym6n8NQYrAhzBpBfoUjZPj9ya1tifsjQZ'; // candy machine oficial
    const CANDY_MACHINE_ADDRESS = '9RgipKxeqKcewftFNJML4P9RQd1pnp8jdSCg6gEqXn7M'; // candy machine de teste
    const NFT_MINT_ADDRESS = 'mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9'
    const PAYMENT_AMOUNT = 1000000000; // Quantidade em menor unidade do token (ex: 1 token = 1000000000 lamports)
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMinting, setIsMinting] = useState<boolean>(false);
    const [itemsAvailable, setItemsAvailable] = useState<number>(0);
    const [mintError, setMintError] = useState<string | null>(null);
    
    const umi = createUmi(QUICKNODE_RPC)
                .use(mplTokenMetadata())
                .use(mplCandyMachine())

    if (publicKey && signTransaction && signAllTransactions) {
        umi.use(walletAdapterIdentity({ publicKey, signTransaction, signAllTransactions }));
    }

    
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

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const mintNFT = async () => {
        handleOpenModal();
        setIsMinting(true);
        setMintError(null);
        try {
            const candyMachineAddress = createPublicKey(CANDY_MACHINE_ADDRESS)
            const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);

             // Gerar o endereço da conta de token associada do usuário
             const userTokenAccount = await getAssociatedTokenAddress(
                new PublicKey(NFT_MINT_ADDRESS),
                new PublicKey(publicKey!.toString())
            );

            // Gerar o endereço da conta de token associada do destinatário (treasury)
            const treasuryTokenAccount = await getAssociatedTokenAddress(
                new PublicKey(NFT_MINT_ADDRESS),
                new PublicKey(candyMachine.mintAuthority.toString())
            );
            
            console.log('Candy Machine:', candyMachine);
            
            const nftMint = generateSigner(umi);
            
            const mintTransaction = transactionBuilder()
                .add(setComputeUnitLimit(umi, { units: 800_000 }))
                .add(
                    mintV2(umi, {
                        candyMachine: candyMachine.publicKey,
                        nftMint,
                        collectionMint: candyMachine.collectionMint,
                        collectionUpdateAuthority: candyMachine.authority,
                        tokenStandard: candyMachine.tokenStandard,
                        candyGuard: candyMachine.mintAuthority,
                        mintArgs: {
                            tokenPayment: {
                                // amount: PAYMENT_AMOUNT,
                                mint: createPublicKey(NFT_MINT_ADDRESS),
                                destinationAta: createPublicKey(treasuryTokenAccount),
                            }
                        }
                    })
                );

            const signature = await mintTransaction.sendAndConfirm(umi)
            console.log('NFT minted successfully', signature);
        } catch (error) {
            console.error('Error minting NFT:', error);
            if (error instanceof WalletSignTransactionError) {
                handleCloseModal();
                return;
            }
            setMintError(error instanceof Error ? error.message : 'Failed to mint NFT. Please try again.');
        } finally {
            setIsMinting(false);
        }
    }

    return (
        <>
            {itemsAvailable > 0 ? (
                <>
                    <button className="buy-nft" onClick={mintNFT}>
                        Cast a Spell
                        <div className="buy-nft--remaining-nfts">({itemsAvailable} remaining)</div>
                    </button>

                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {isMinting ? (
                            <div className="minting-loader">
                                <div className="loader"></div>
                                <p className='minting-loader--message'>Minting your NFT...</p>
                            </div>
                        ) : mintError ? (
                            <div className="buy-nft--error">
                                <p className="buy-nft--error-message">
                                    There was an error minting your NFT.Please try again.
                                </p>
                                <button className="buy-nft buy-nft--try-again" onClick={mintNFT}>
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <>
                                <img className="buy-nft--nft-image" src={empressImage} alt="Your new NFT" />
                                <p className='buy-nft--success-message'>NFT successfully bought!</p>
                                <button className="buy-nft" onClick={handleCloseModal}>Close</button>
                            </>
                        )}
                    </Modal>
                </>
            ) : (
                <div className="buy-nft--sold-out">Sold out!</div>
            )}
        </>
    );
}

export default BuyNFTButton;