import '../styles/Footer.scss';
import spellcastersLogo from '../assets/spellcaster-logo.avif';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
          <img src={spellcastersLogo} alt="Spellcasters Logo" className="logo" /> <span>SPELLCASTERS</span>
        <p>For Those Who See Beyond</p>
        <p>© Copyright 2024 Tü.uk'z</p>
      </div>
      <div className="footer-center">
        <ul>
          <Link to="/">
            <li>$SPELL</li>
          </Link>
          <Link to="/nfts">
            <li>NFT Collect</li>
          </Link>
          <Link to="/collabs">
            <li>Collabs</li>
          </Link>
        </ul>
      </div>
      <div className="footer-right">
        <div className="social-icons">
          <img src="path/to/twitter-icon.png" alt="Twitter" />
          <img src="path/to/telegram-icon.png" alt="Telegram" />
          <img src="path/to/instagram-icon.png" alt="Instagram" />
          <img src="path/to/other-icon.png" alt="Other" />
        </div>
        <p>Follow us</p>
      </div>
    </footer>
  );
};

export default Footer;
