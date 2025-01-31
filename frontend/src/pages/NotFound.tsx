import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/NotFound.scss';

const NotFound = () => {
    return (
        <>
            <div className="not-found">
                <Header />
                <section className="main-content">
                    <div className="error-message">
                        <h1>404</h1>
                        <p>Page not found</p>
                        <p className="subtext">RIGHT DOMAIN BUT WRONG PATH</p>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default NotFound;
