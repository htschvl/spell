import { Link } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '../styles/Header.scss';
import '@solana/wallet-adapter-react-ui/styles.css';

function Header() {
    const endpoint = clusterApiUrl('devnet'); // TODO: implements environment variables
    const wallets = [new PhantomWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <header className="spellcasters-header">
                        <Link to="/">
                            <img src="logo.png" alt="Logo" className="logo" />
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