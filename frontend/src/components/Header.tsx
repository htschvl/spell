import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useState, useEffect } from 'react';

import '../styles/Header.scss';
import '@solana/wallet-adapter-react-ui/styles.css';

import spellcastersLogo from '../assets/spellcaster-logo.avif';

function Header() {
    const endpoint = clusterApiUrl('mainnet-beta'); // TODO: implements environment variables
    const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
    ];

    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800); // Set mobile view based on width
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {isMobile ? ( // Conditional rendering for mobile header
                        <header className="mobile-header">
                            <Link to="/" className='logo-container'>
                                <img src={spellcastersLogo} alt="Spellcasters Logo" className="logo" />
                                <span className="spellcaster-logo">SPELLCASTERS</span>
                            </Link>

                            <button className="hamburger" onClick={toggleMenu} style={{ borderRadius: '50%', backgroundColor: 'transparent', border: '1px solid #5a34b2', width: 'inherit' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="20" viewBox="0 0 50 50" color='#5a34b2'>
                                    <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                                </svg>
                            </button>
                            {menuOpen && ( // Render menu if open
                                <nav className="vertical-menu">
                                    <ul>
                                        <li>
                                            <Link to="/nfts">NFTs ($SPELL Holders)</Link>
                                        </li>
                                        <li>
                                            <Link to="/collabs">Collabs</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact</Link>
                                        </li>
                                        <li>
                                            <WalletMultiButton />
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </header>
                    ) : (
                        <header className="spellcasters-header">
                            <Link to="/" className='logo-container'>
                                <span className="image-container">
                                    <img src={spellcastersLogo} alt="Spellcasters Logo" className="logo" />
                                </span>
                                <span className="spellcaster-logo">SPELLCASTERS</span>
                            </Link>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/nfts">NFTs ($SPELL Holders)</Link>
                                    </li>
                                    <li>
                                        <Link to="/collabs">Collabs</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                            <WalletMultiButton />
                        </header>
                    )}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default Header;