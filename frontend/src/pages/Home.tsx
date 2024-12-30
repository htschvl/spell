import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Home.scss';

const Home = () => {
    return (
        <>
            {/* INTRO */}
            <div className="spellcasters-intro-container">
                <Header />
                <h1>A bridge between worlds</h1>
                <h2>FOR THOSE WHO SEE BEYOND</h2>
                <p>
                    Spellcasters is more than an art collection - we're crafting digital enchantments
                    where every pixel holds a story, every glitch opens a gateway, and every collector
                    becomes part of the magic.
                </p>
                <button className="buy-spell">Buy $SPELL</button>
                <div className="spellcasters-contract-addr">
                    <p>Contract address: 8zrgKoeADL7c8Sn8sgHnE22lnEa4oEjAptVpump</p>
                </div>
            </div>

            {/* ABOUT THE TOKEN */}
            <section className="about-token">
                <h1>$SPELL: A token for transformation by Tü.uk'z</h1>
                <h2>WE'RE BULLISH ON ART AND CULTURE</h2>

                <div>
                    <h3>Born from artistic vision</h3>
                    <p>
                        Each piece begins as a whisper between dimensions, where glitch meets grace in
                        the digital void. My journey from Brazilian street art to blockchain sorcery has
                        always followed one truth: beauty emerges from controlled chaos.
                    </p>
                </div>

                <div>
                    <h3>Powered by community magic</h3>
                    <p>
                        Our strength flows from a circle of collectors, creators, and visionaries
                        who understand that art transcends its medium. Together we're weaving a new
                        tapestry of possibilities, where every holder becomes part of the artwork's
                        evolving story.
                    </p>
                </div>

                <div>
                    <h3>Sustained by true believers</h3>
                    <p>
                        This isn't for the quick flip or the passing trend - it's for those who see the
                        eternal in the ephemeral, who collect not just art but moments of digital
                        transcendence. Our collectors are curators of tomorrow's cultural heritage, each
                        $SPELL token representing a thread in our collective dreamscape.
                    </p>
                </div>

                {/* TODO: insert the image */}
                <div className="artwork">
                    <img src="path/to/your/image.jpg" alt="Artwork" />
                </div>

                <div>
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
                <a href="#" className="learn-link">Learn about $SPELL</a>
                <h2>VIEW OUR LISTINGS</h2>

                <div className="listings">
                    {/* TODO: create carousel component */}
                    {/* TODO: insert the logos and link them to their pages */}
                    <div className="listing-card">
                        <img src="path/to/coingecko-logo.png" alt="CoinGecko" />
                        <p>We're listed on CoinGecko as "The Spellcaster" (SPELL)</p>
                    </div>
                    <div className="listing-card">
                        <img src="path/to/dexscreener-logo.png" alt="Dexscreener" />
                        <p>Check out SPELL/SOL on Dexscreener</p>
                    </div>
                </div>
            </section>

            {/* JOIN THE CIRCLE */}
            <section className="circle">
                <div className="text-section">
                    <a href="#" className="join-link">Join the circle</a>
                    <h2>CAST YOUR FIRST SPELL</h2>
                    <p>
                        This is for the dreamers, the believers, the ones who see beauty in
                        broken code and magicin the machine. Together, we're creating something
                        timeless in the ephemeral world of digital art.
                    </p>
                    <div className="icons">
                        <img src="path/to/icon1.png" alt="Icon 1" />
                        <img src="path/to/icon2.png" alt="Icon 2" />
                    </div>
                </div>
                <div className="image-section">
                    <img src="path/to/your/image.jpg" alt="Art" />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home;