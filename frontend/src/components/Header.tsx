import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '../styles/Header.scss';
import '@solana/wallet-adapter-react-ui/styles.css';

import spellcastersLogo from '../assets/spellcaster-logo.avif';

function Header() {
    const endpoint = clusterApiUrl('mainnet-beta'); // TODO: implements environment variables
    const wallets = [new PhantomWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
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
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default Header;