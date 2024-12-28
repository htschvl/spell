import '../styles/Footer.scss';

function Footer () {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="path/to/logo.png" alt="Spellcasters Logo" className="logo" />
        <h3>SPELLCASTERS</h3>
        <p>For Those Who See Beyond</p>
        <p>© Copyright 2024 Tü.uk'z</p>
      </div>
      <div className="footer-center">
        <ul>
          <li>$SPELL</li>
          <li>NFT Collect</li>
          <li>Collabs</li>
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
