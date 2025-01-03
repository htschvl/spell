import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../styles/NTFs.scss'

type NFT = {
    id: string;
    name: string;
    status: string;
};

const mockNFTs: NFT[] = [
    { id: '001', name: 'Spellcaster 001', status: 'Available' },
    { id: '002', name: 'Spellcaster 002', status: 'Available' },
    { id: '003', name: 'Spellcaster 003', status: 'Available' },
    { id: '004', name: 'Spellcaster 004', status: 'Available' },
    { id: '005', name: 'Spellcaster 005', status: 'Available' },
    { id: '006', name: 'Spellcaster 006', status: 'Available' },
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
            <Header />

            <section className="ntfs-page">
                <div className="intro">
                    <p>
                        Together, we're creating something timeless in the ephemeral world of digital art.
                        1000 NFTs for the dreamers, believers, who see beauty in broken code and magic in the machine.
                    </p>
                </div>
                <div className="collection">
                    {nfts.map(nft => (
                        <div key={nft.id} className="nft-item">
                            <img src={`spellcaster${nft.id}.jpg`} alt={nft.name} />
                            <p>{nft.name}</p>
                            <p>{nft.status}</p>
                        </div>
                    ))}
                </div>
                <div className="footer">
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