import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import Header from '../components/Header';
import BuyNFTButton from '../components/BuyNFTButton';
import PurchaseModal from '../components/PurchaseModal';
import Footer from '../components/Footer';

import '../styles/NFTMarketplace.scss';

const QUICKNODE_RPC = 'https://quick-side-gas.solana-devnet.quiknode.pro/abcf0c14dc61b97348f4ad07b4fa4b8c3a686a1b';
const NFT_MINT_ADDRESS = 'mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9'
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const NFTMarketplace = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        const fetchWalletInfo = async () => {
            if (wallet.connected && wallet.publicKey) {
                try {
                    const umi = await createUmi(QUICKNODE_RPC);
                    umi.use(walletAdapterIdentity(wallet));
                    
                    console.log('balance', await umi.rpc.getBalance(publicKey(wallet.publicKey)));
                    
                    const balance = (await umi.rpc.getBalance(publicKey(wallet.publicKey))).basisPoints;
                    const solBalance = Number(balance) / LAMPORTS_PER_SOL;
                    setBalance(solBalance);

                    console.log('Endereço da carteira:', wallet.publicKey.toString());
                    console.log('Saldo em SOL:', solBalance);

                } catch (error) {
                    console.error('Erro ao buscar informações da carteira:', error);
                }
            }
        };

        const getTokenBalanceWeb3 = async(accountPublicKey: PublicKey, mintAccount: PublicKey) => {
            if (wallet.connected && wallet.publicKey) {
                try {
                    // Get the token accounts for the given wallet and mint
                    const tokenAccounts = await SOLANA_CONNECTION.getTokenAccountsByOwner(accountPublicKey, {
                        mint: mintAccount
                    });
            
                    if (tokenAccounts.value.length === 0) {
                        console.log("No token accounts found for this wallet and mint.");
                    } else {
                        // Fetch the balance for the first token account
                        const tokenAccount = tokenAccounts.value[0];
                        const balance = await SOLANA_CONNECTION.getTokenAccountBalance(tokenAccount.pubkey);
                        console.log("Token balance:", Number(balance.value.amount) / 1000000);
                    }
                } catch (error) {
                    console.error("Error fetching token balance:", error);
                }
            }
        }

        // TODO: implement a function to get the total supply of an NFT collection
        // const getNFTTotalSupply = async(mintAddress: string) => {
        //     const connection = new Connection(QUICKNODE_RPC);
        //     const metaplex = new Metaplex(connection);
        //     const mintPublicKey = new PublicKey(mintAddress);

        //     try {
        //         const nft = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey });
                
        //         if (nft.collection) {
        //             const collectionNft = await metaplex.nfts().findByMint({ 
        //                 mintAddress: nft.collection.address 
        //             });
                    
        //             if (collectionNft.collectionDetails) {
        //                 const totalSupply = collectionNft.collectionDetails.size;
        //                 console.log(`Total supply of the NFT collection: ${totalSupply}`);
        //                 return totalSupply;
        //             }
        //         }
        //         console.log('No collection details found');
        //         return null;
        //     } catch (error) {
        //         console.error('Error fetching NFT collection details:', error);
        //         return null;
        //     }
        // }

        fetchWalletInfo();
        getTokenBalanceWeb3(wallet.publicKey!, new PublicKey(NFT_MINT_ADDRESS));
        // getNFTTotalSupply(NFT_MINT_ADDRESS);
    }, [wallet.connected, wallet.publicKey]);

    return (
        <div className="collabs-container">
            <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} nftName="NFT Name" />
            <Header />
            <section className="nft-market">
                <h1>NFT Market</h1>
                <h2>Buy your Spell Here!</h2>
            </section>

            <section className="buy-nft-section">
                {wallet.connected && wallet.publicKey && (
                    <div className="wallet-info">
                        <p>Carteira conectada: {wallet.publicKey.toString()}</p>
                        {balance !== null && <p>Saldo: {balance.toFixed(4)} SOL</p>}
                    </div>
                )}

                <p>A new random NFT for you</p>
                <h2>BUY YOUR NEW NFT BELLOW</h2>

                <div className="lower-section">
                    {wallet.connected && wallet.publicKey ? (
                        <BuyNFTButton />
                    ) : (
                        <>
                            <p>Connect your wallet and have your own spell now!</p>
                        </>
                    )}
                </div>

            </section>

            <Footer />
        </div>
    );
};

export default NFTMarketplace; 