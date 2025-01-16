import { useCallback } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

import '../styles/BuyNFTButton.scss';

const BuyNFTButton = () => {
    const mintNFT = useCallback(async () => {
        try {
            // Inicializa Umi com a conexão testnet
            const umi = createUmi(clusterApiUrl('testnet'))
                .use(mplTokenMetadata());

            // Verifica se há uma carteira conectada
            if (!umi.identity.publicKey) {
                alert('Please, connect your wallet first!');
                return;
            }

            // Correção na chamada de criação do NFT
            const nft = await mplTokenMetadata.createFungible(umi, {
                name: 'Meu NFT',
                uri: 'https://seu-metadata-uri.json',
                sellerFeeBasisPoints: 500,
            });

            alert(`NFT cunhado com sucesso! Endereço: ${nft.toString()}`);
        } catch (error) {
            console.error('Erro ao cunhar NFT:', error);
            alert('Erro ao cunhar NFT!');
        }
    }, []);

    return (
        <button className="buy-nft" onClick={mintNFT}>
            Get Your Spell
        </button>
    );
}

export default BuyNFTButton;