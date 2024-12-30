import { useState } from 'react';

import '../styles/Header.scss'

function HeaderWithoutSolana() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        if (window.solana) {
            try {
                const response = await window.solana.connect();
                setWalletAddress(response.publicKey.toString());
            } catch (err) {
                console.error("Failed to connect wallet:", err);
            }
        } else {
            alert("Solana wallet not found! Please install a wallet extension.");
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
    };

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
            <button className="connect-wallet" onClick={walletAddress ? disconnectWallet : connectWallet}>
                {walletAddress ? `Disconnect (${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)})` : 'Connect Wallet'}
            </button>
        </header>
    );
}

export default HeaderWithoutSolana;