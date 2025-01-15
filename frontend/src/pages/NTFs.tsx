import { useEffect, useState } from "react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

import Footer from "../components/Footer";
import Header from "../components/Header";

import '../styles/NTFs.scss'

import img_001 from '../assets/1.avif';
import BuySpellButton from "../components/BuySpellButton";

type NFT = {
    id: string;
    name: string;
    status: string;
};

{/* TODO: implement the spell contract */ }
const mockNFTs: NFT[] = [
    { id: '1', name: 'Spellcaster 001', status: 'Available' },
    { id: '2', name: 'Spellcaster 002', status: 'Available' },
    { id: '3', name: 'Spellcaster 003', status: 'Available' },
    { id: '4', name: 'Spellcaster 004', status: 'Available' },
    { id: '5', name: 'Spellcaster 005', status: 'Available' },
    { id: '6', name: 'Spellcaster 006', status: 'Available' },
];

const NTFs = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const wallet = useWallet()

    useEffect(() => {
        // Simulate fetching NFT data
        const fetchNFTs = async () => {
            console.log('connected', wallet.connected)
            if (wallet.connected) {
                const umi = createUmi('https://metaplex.devnet.rpcpool.com/')
                console.log('umi', umi);
                umi.use(walletAdapterIdentity(wallet))
                setNfts(mockNFTs);
            }
        };

        fetchNFTs(); // Call the function to fetch NFTs
    }, []); // Add an empty dependency array to run once on mount

    return (
        <>

            <section className="ntfs-page">
                <div className="intro">
                    <Header />
                    <h1>Exclusive for $SPELL holders</h1>
                    <h2>AN EXCLUSIVE PFP COLLECTION</h2>
                </div>
                <div className="collection">
                    <div className="collection-container">
                        <p className="collection-title">
                            Together, we're creating something timeless in the ephemeral world of digital art
                        </p>

                        <h1 className="collection-subtitle">
                            1000 NFTs for the dreamers, believers, who see beauty in broken code and magic in the machine.
                        </h1>
                    </div>

                    {nfts.map(nft => (
                        <div key={nft.id} className="nft-item">
                            <img src={img_001} alt={nft.name} />
                            <p className="nft-name">{nft.name}</p>
                            <p className="nft-status">{nft.status}</p>
                        </div>
                    ))}
                </div>

                <div className="lower-section">
                    <p>... and many more</p>
                    <h3>Be ready when our collection launches</h3>
                    <BuySpellButton />
                </div>
            </section>

            <Footer />
        </>
    );
}

export default NTFs;