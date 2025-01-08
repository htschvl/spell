import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/ContactUs.scss';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="header-session">
                <Header />
            </div>

            <div className="contact-session">
                <h2>Any Question?</h2>
                <h3>Contact us</h3>
                <p>Please get in touch with us and we will respond to you as soon as possible.</p>
                <form>
                    <div className="input-fields">
                        <input type="text" placeholder="Full name" required />
                        <input type="email" placeholder="Email Address" required />
                    </div>
                    <textarea placeholder="Message" required></textarea>
                    <br />
                    <button type="submit">Send</button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUs;
