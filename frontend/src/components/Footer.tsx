import '../styles/Footer.scss';
import spellcastersLogo from '../assets/spellcaster-logo.avif';
import { Link } from 'react-router-dom';

import twitterIcon from '../assets/twitter.png';
import telegramIcon from '../assets/telegram.png';

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
        </ul>
      </div>
      <div className="footer-right">
        <div className="footer-right-section">
          <div className="social-icons">
            <a href="https://x.com/spellcasterart" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://t.me/spellcasterart" target="_blank" rel="noopener noreferrer">
              <img src={telegramIcon} alt="Telegram" />
            </a>
          </div>
          <p>Follow Spellcaster</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
