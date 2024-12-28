import AboutToken from '../components/AboutToken';
import Circle from '../components/Circle';
import Footer from '../components/Footer';
import Intro from '../components/Intro';
import Learn from '../components/Learn';
import '../styles/Main.scss'

function Main() {
    return (
        <div className='spellcasters-container'>
            <main>
                <Intro />
                <AboutToken />
                <Learn />
                <Circle />
                <Footer />
            </main>
        </div>
    );
}

export default Main;