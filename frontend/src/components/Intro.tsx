import '../styles/Intro.scss';
import Header from './Header';

function Intro() {
    return (
        <article className="spellcasters-intro-container">
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
        </article>
    );
};

export default Intro;
