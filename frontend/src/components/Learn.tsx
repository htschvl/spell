import '../styles/Learn.scss'; // Supondo que você tenha um arquivo CSS para estilização

function Learn () {
  return (
    <div className="learn">
      <a href="#" className="learn-link">Learn about $SPELL</a>
      <h2>VIEW OUR LISTINGS</h2>

      <div className="listings">
        {/* TODO: create carousel component */}
        <div className="listing-card">
          <img src="path/to/coingecko-logo.png" alt="CoinGecko" />
          <p>We're listed on CoinGecko as "The Spellcaster" (SPELL)</p>
        </div>
        <div className="listing-card">
          <img src="path/to/dexscreener-logo.png" alt="Dexscreener" />
          <p>Check out SPELL/SOL on Dexscreener</p>
        </div>
      </div>
    </div>
  );
};

export default Learn;
