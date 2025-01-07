import Header from '../components/Header';
import '../styles/Collabs.scss';

const Collabs = () => {
    return (
        <div className="collabs-container">
            <Header />
            <section className="spread-art">
                <h1>Spread Art</h1>
                <h2>ARTIST COLLABORATIONS</h2>
            </section>

            <section className="recent-collaborations">
                <p>Learn More</p>
                <h2>RECENT COLLABORATIONS</h2>
                <div className="collab-item">
                    <img src="path/to/image.jpg" alt="Collaboration" />
                    <div className="collab-info">
                        <h3>Spellcasters x DeSci Hub</h3>
                        <p>Dec 1, 2024</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Collabs; 