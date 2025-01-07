import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

import '../styles/NTFs.scss'

import img_001 from '../assets/1.avif';
// import img_002 from '../assets/2.avif';
// import img_003 from '../assets/3.avif';
// import img_004 from '../assets/4.avif';
// import img_005 from '../assets/5.avif';
// import img_006 from '../assets/6.avif';

type NFT = {
    id: string;
    name: string;
    status: string;
};

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

    useEffect(() => {
        // Simulate fetching NFT data
        const fetchNFTs = async () => {
            setNfts(mockNFTs);
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
                    <p>
                        Together, we're creating something timeless in the ephemeral world of digital art.
                        1000 NFTs for the dreamers, believers, who see beauty in broken code and magic in the machine.
                    </p>

                    {nfts.map(nft => (
                        <div key={nft.id} className="nft-item">
                            <img src={img_001} alt={nft.name} />
                            <p>{nft.name}</p>
                            <p>{nft.status}</p>
                        </div>
                    ))}
                </div>
                
                <div className="lower-section">
                    <p>... and many more</p>
                    <h3>Be ready when our collection launches</h3>
                    <button>Buy $SPELL now</button>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default NTFs;