import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

import '../styles/About.scss'

import img_001 from '../assets/1.avif';
import img_002 from '../assets/2.avif';
import img_003 from '../assets/3.avif';
import img_004 from '../assets/4.avif';
import img_005 from '../assets/5.avif';
import img_006 from '../assets/6.avif';

const About = () => {
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
                    <h1>Enter the digital void</h1>
                    <h2>ABOUT SPELLCASTERS</h2>
                </div>
                <div className="collection">
                    <div className="collection-container">
                        <p className="collection-title">
                            Together, we're creating something timeless in the ephemeral world of digital art
                        </p>

                        <h1 className="collection-subtitle">
                            FOR THE DREAMERS, BELIEVERS, WHO SEE BEAUTY IN BROKEN CODE AND MAGIC IN THE MACHINE.
                        </h1>
                        <div className="about-the-autor">
                            <h2 className="paragraph-title">The Digital Enchanter</h2>

                            <p className="paragraph-text">
                                Tù.úk'z (Arthur Machado) emerged from the Eastern Amazon of Brazil to become one of the most
                                influential voices in digital art since 2012. As a pioneer in glitch art and AI experimentation,
                                his work transcends traditional boundaries, weaving together broken code, digital dreams,
                                and mystical divination into mesmerizing visual experiences. Making history as the first
                                Amazonian digital artist to have works auctioned at both Sotheby's and Christie's, Tù.úk'z's
                                pieces have achieved remarkable recognition in the traditional art world.
                                His recent piece "Lush Illusions" was featured at Christie's 3.0, marking another milestone
                                in his artistic journey.
                            </p>

                            <h2 className="paragraph-title">Journey to Digital Sorcery</h2>

                            <p className="paragraph-text">
                                Tù.úk'z (Arthur Machado) emerged from the Eastern Amazon of Brazil to become one of the most
                                influential voices in digital art since 2012. As a pioneer in glitch art and AI experimentation,
                                his work transcends traditional boundaries, weaving together broken code, digital dreams,
                                and mystical divination into mesmerizing visual experiences. Making history as the first
                                Amazonian digital artist to have works auctioned at both Sotheby's and Christie's, Tù.úk'z's
                                pieces have achieved remarkable recognition in the traditional art world. His recent piece
                                "Lush Illusions" was featured at Christie's 3.0, marking another milestone in his artistic journey.
                            </p>

                            <h2 className="paragraph-title">The Spellcasters PFP Collection</h2>

                            <p className="paragraph-text">
                                The Spellcasters collection represents Tù.úk'z's most ambitious project yet - 1000 unique
                                digital enchantments where glitch meets grace in the digital void. Each piece serves as a
                                gateway between dimensions, crafted for those who see beauty in broken code and magic in
                                the machine. The collection uniquely incorporates elements of his tarot practice,
                                with each piece capturing the essence of a reading—a story frozen in digital time.
                                Unlike traditional PFP collections, Spellcasters draws from Tù.úk'z's mastery of glitch
                                art techniques and his extensive background in audiovisual experiments. Each piece begins
                                as a whisper between dimensions, manifesting as unique digital incantations that blur the
                                line between technology and mysticism.
                            </p>

                            <h2 className="paragraph-title">Community of Believers</h2>

                            <p className="paragraph-text">
                                The Spellcasters project isn't just about collecting art - it's about joining a circle
                                of visionaries who understand that art transcends its medium. Each holder becomes part
                                of the artwork's evolving story, curating tomorrow's cultural heritage through digital
                                transcendence, guided by the mystical thread that weaves through Tù.úk'z's creative universe.
                            </p>
                        </div>
                    </div>

                    <div key="1" className="nft-item">
                        <img src={img_001} alt="Spellcaster 001" />
                    </div>

                    <div key="2" className="nft-item">
                        <img src={img_002} alt="Spellcaster 002" />
                    </div>

                    <div key="3" className="nft-item">
                        <img src={img_003} alt="Spellcaster 003" />
                    </div>

                    <div key="4" className="nft-item">
                        <img src={img_004} alt="Spellcaster 004" />
                    </div>

                    <div key="5" className="nft-item">
                        <img src={img_005} alt="Spellcaster 005" />
                    </div>

                    <div key="6" className="nft-item">
                        <img src={img_006} alt="Spellcaster 006" />
                    </div>
                </div>

                <div className="lower-section">
                    <p className="lower-section-title">Unlock the magic</p>
                    <h3 className="lower-section-subtitle">BECOME A SPELLCASTER</h3>
                    <p className="lower-section-text">Get started now on FinancierAI to organize your budget with today!</p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default About;