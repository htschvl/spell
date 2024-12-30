import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/NTFs.scss'

const NTFs = () => {
    return (
        <>
            <Header />

            <section className="ntfs-page">
                <div className="intro">
                    <p>
                        Together, we're creating something timeless in the ephemeral world of digital art.
                        1000 NFTs for the dreamers, believers, who see beauty in broken code and magic in the machine.
                    </p>
                </div>
                {/* TODO: import the NFTs from the Solana Spellcasters Contract */}
                <div className="collection">
                    <div className="nft-item">
                        <img src="spellcaster001.jpg" alt="Spellcaster 001" />
                        <p>Spellcaster 001</p>
                        <p>Available</p>
                    </div>
                    <div className="nft-item">
                        <img src="spellcaster002.jpg" alt="Spellcaster 002" />
                        <p>Spellcaster 002</p>
                        <p>Available</p>
                    </div>
                    <div className="nft-item">
                        <img src="spellcaster003.jpg" alt="Spellcaster 003" />
                        <p>Spellcaster 003</p>
                        <p>Available</p>
                    </div>
                    <div className="nft-item">
                        <img src="spellcaster004.jpg" alt="Spellcaster 004" />
                        <p>Spellcaster 004</p>
                        <p>Available</p>
                    </div>
                    <div className="nft-item">
                        <img src="spellcaster005.jpg" alt="Spellcaster 005" />
                        <p>Spellcaster 005</p>
                        <p>Available</p>
                    </div>
                    <div className="nft-item">
                        <img src="spellcaster006.jpg" alt="Spellcaster 006" />
                        <p>Spellcaster 006</p>
                        <p>Available</p>
                    </div>
                </div>
                <div className="footer">
                    <p>... and many more</p>
                    <h3>Be ready when our collection launches</h3>
                    <button>Buy $SPELL now</button>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default NTFs;