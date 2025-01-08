import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import '../styles/Home.scss';

import bullishImage from '../assets/bullish.jpeg';
import spellcasterFortune from '../assets/Spellcaster-Fortune.jpg';
import dexscreenerLogo from '../assets/dexscreener-logo.avif';
import aveLogo from '../assets/ave-logo.avif';
import BuySpellButton from "../components/BuySpellButton";

const Home = () => {
    return (
        <>
            {/* INTRO */}
            <div className="spellcasters-intro-container">
                <Header />
                <div className="spellcaster-intro-container--text">
                    <h1 className="spellcaster-intro-container--text--title">A bridge between worlds</h1>
                    <h2>FOR THOSE WHO SEE BEYOND</h2>
                    <p className="about-spellcaster">
                        Spellcasters is more than an art collection - we're crafting digital enchantments
                        where every pixel holds a story, every glitch opens a gateway, and every collector
                        becomes part of the magic.
                    </p>
                    <BuySpellButton />
                </div>
                <div className="spellcasters-contract-addr">
                    <p>Contract address: 8zrgKoeADL7c8Sn8sgHnE22lnEa4oEjAptVpump</p>
                </div>
            </div>

            {/* ABOUT THE TOKEN */}
            <section className="about-token">
                <div className="about-token--flexbox">
                    <div className="about-token--flexbox--left-separator">
                        <h1>$SPELL: A token for transformation by Tü.uk'z</h1>
                        <h2>WE'RE BULLISH ON ART AND CULTURE</h2>
                        <div className="about-token--flexbox--left-separator--paragraph">
                            <h3>Born from artistic vision</h3>
                            <p>
                                Each piece begins as a whisper between dimensions, where glitch meets grace in
                                the digital void. My journey from Brazilian street art to blockchain sorcery has
                                always followed one truth: beauty emerges from controlled chaos.
                            </p>
                        </div>

                        <div className="about-token--flexbox--left-separator--paragraph">
                            <h3>Powered by community magic</h3>
                            <p>
                                Our strength flows from a circle of collectors, creators, and visionaries
                                who understand that art transcends its medium. Together we're weaving a new
                                tapestry of possibilities, where every holder becomes part of the artwork's
                                evolving story.
                            </p>
                        </div>

                        <div className="about-token--flexbox--left-separator--paragraph">
                            <h3>Sustained by true believers</h3>
                            <p>
                                This isn't for the quick flip or the passing trend - it's for those who see the
                                eternal in the ephemeral, who collect not just art but moments of digital
                                transcendence. Our collectors are curators of tomorrow's cultural heritage, each
                                $SPELL token representing a thread in our collective dreamscape.
                            </p>
                        </div>
                    </div>

                    <div className="about-token--flexbox--right-separator">
                        <div className="artwork">
                            <img src={bullishImage} alt="Artwork" />
                        </div>
                    </div>
                </div>


                <div className="tuukz-artworks">
                    <p>Tü.uk'z artworks</p>
                    <div className="partners">
                        {/* TODO: insert the logos and link them to their pages */}
                        <img src="path/to/objkt-logo.png" alt="Objkt" />
                        <img src="path/to/superrare-logo.png" alt="SuperRare" />
                        <img src="path/to/sothebys-logo.png" alt="Sotheby's" />
                        <img src="path/to/zora-logo.png" alt="Zora" />
                        <img src="path/to/christies-logo.png" alt="Christie's" />
                        <img src="path/to/rarible-logo.png" alt="Rarible" />
                    </div>
                </div>
            </section>

            {/* LEARN ABOUT $SPELL */}
            <section className="learn">
                <h1 className="learn-link">Learn about $SPELL</h1>
                <h2>VIEW OUR LISTINGS</h2>

                <div className="listings">
                    {/* TODO: fix carousel component */}
                    <Carousel />
                </div>
            </section>

            {/* JOIN THE CIRCLE */}
            <section className="circle">
                <div className="text-section">
                    <h1 className="join-title">Join the circle</h1>
                    <h2>CAST YOUR FIRST SPELL</h2>
                    <p>
                        This is for the dreamers, the believers, the ones who see beauty in
                        broken code and magicin the machine. Together, we're creating something
                        timeless in the ephemeral world of digital art.
                    </p>
                    <div className="icons">
                        {/* TODO: remove the hardcoded links */}
                        <a target="_blank" href="https://dexscreener.com/solana/a1xzyvolyjsbsnrhes6v4vtdxpj5bukvwkjrwskvuu4">
                            <img src={dexscreenerLogo} alt="Dexscreener" />
                        </a>

                        <a target="_blank" href="https://ave.ai/token/8zrgK9eADL7fc5GSn8seJ4n9E22bn5a4o5JiAptVpump-solana?from=Home">
                            <img src={aveLogo} alt="AVE" />
                        </a>
                    </div>
                </div>
                <div className="image-section">
                    <img src={spellcasterFortune} alt="Art" />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home;