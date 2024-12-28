import '../styles/Header.scss'

function Header() {
    return (
        <header className="spellcasters-header">
            <img src="logo.png" alt="Logo" className="logo" />
            <nav>
                <ul>
                    <li>NFTs ($SPELL Holders)</li>
                    <li>Collabs</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <button className="connect-wallet">Connect Wallet (Coming Soon)</button>
        </header>
    );
}

export default Header;