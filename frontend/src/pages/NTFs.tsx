import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

import '../styles/NTFs.scss'

import img_001 from '../assets/1.avif';
import img_002 from '../assets/2.avif';
import img_003 from '../assets/3.avif';
import img_004 from '../assets/4.avif';
import img_005 from '../assets/5.avif';
import img_006 from '../assets/6.avif';

const NTFs = () => {
    const wallet = useWallet();

    useEffect(() => {
        const fetchWalletInfo = async () => {
            if (wallet.connected && wallet.publicKey) {
                try {
                    const umi = await createUmi('https://api.devnet.solana.com');
                    umi.use(walletAdapterIdentity(wallet));

                } catch (error) {
                    console.error('Erro ao buscar informações da carteira:', error);
                }
            }
        };

        fetchWalletInfo();
    }, [wallet.connected, wallet.publicKey]);

    return (
        <>
            <section className="ntfs-page">
                <div className="intro">
                    <Header />
                    <h1>Exclusive for $SPELL holders</h1>
                    <h2>AN EXCLUSIVE PFP COLLECTION</h2>
                </div>
                <div className="collection">
                    <div className="collection-container">
                        <p className="collection-title">
                            Together, we're creating something timeless in the ephemeral world of digital art
                        </p>

                        <h1 className="collection-subtitle">
                            1000 NFTs for the dreamers, believers, who see beauty in broken code and magic in the machine.
                        </h1>
                    </div>

                    <div key="1" className="nft-item">
                        <img src={img_001} alt="Spellcaster 001" />
                        <p className="nft-name">Spellcaster 001</p>
                        <p className="nft-status">Available</p>
                    </div>

                    <div key="2" className="nft-item">
                        <img src={img_002} alt="Spellcaster 002" />
                        <p className="nft-name">Spellcaster 002</p>
                        <p className="nft-status">Available</p>
                    </div>

                    <div key="3" className="nft-item">
                        <img src={img_003} alt="Spellcaster 003" />
                        <p className="nft-name">Spellcaster 003</p>
                        <p className="nft-status">Available</p>
                    </div>

                    <div key="4" className="nft-item">
                        <img src={img_004} alt="Spellcaster 004" />
                        <p className="nft-name">Spellcaster 004</p>
                        <p className="nft-status">Available</p>
                    </div>

                    <div key="5" className="nft-item">
                        <img src={img_005} alt="Spellcaster 005" />
                        <p className="nft-name">Spellcaster 005</p>
                        <p className="nft-status">Available</p>
                    </div>

                    <div key="6" className="nft-item">
                        <img src={img_006} alt="Spellcaster 006" />
                        <p className="nft-name">Spellcaster 006</p>
                        <p className="nft-status">Available</p>
                    </div>
                </div>

                <div className="lower-section">
                    <p>... and many more</p>
                    {wallet.connected && wallet.publicKey ? (
                        <h3>
                            <Link to="/buy-nft">
                                Click here to buy your first NFT wow!
                            </Link>

                        </h3>
                    ) : (
                        <>

                            <h3>
                                Connect Your Wallet to Buy your first NFT!
                            </h3>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}

export default NTFs;