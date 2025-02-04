// import { useCallback } from 'react';
// import { clusterApiUrl } from '@solana/web3.js';
// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

import { generateSigner, PublicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl } from '@solana/web3.js';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';

import '../styles/BuyNFTButton.scss';
import { mint } from '@metaplex-foundation/mpl-candy-machine';

const CANDY_MACHINE_PUBLIC_KEY = 'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
const NFT_ADDRESS = '48ijMjApmJiym6n8NQYrAhzBpBfoUjZPj9ya1tifsjQZ';

const BuyNFTButton = () => {
    const umi = createUmi(clusterApiUrl('devnet')).use(mplTokenMetadata());

    const buyNFT = async () => {
        try {
            // Verifica se há uma carteira conectada
            if (!umi.identity.publicKey) {
                alert('Por favor, conecte sua carteira primeiro!');
                return;
            }

            const transaction = transactionBuilder()
                .add(setComputeUnitLimit(umi, { units: 1000000 }))
                .add(
                    mint(umi, {
                        candyMachine: CANDY_MACHINE_PUBLIC_KEY as PublicKey,
                        collectionMint: NFT_ADDRESS as PublicKey,
                        nftMint: umi.identity.publicKey,
                        collectionUpdateAuthority: umi.identity.publicKey
                    })
                )
                // Aqui adicionaremos a instrução de transferência do NFT
                // Você precisará implementar a lógica específica de transferência
                // baseada no seu caso de uso (marketplace, venda direta, etc.)

            const result = await transaction.sendAndConfirm(umi);
            
            alert('NFT comprado com sucesso!');
            console.log('Transação:', result.signature);
        } catch (error) {
            console.error('Erro ao comprar NFT:', error);
            alert('Erro ao comprar o NFT!');
        }
    };

    return (
        <button className="buy-nft" onClick={buyNFT}>
            Cast a Spell
        </button>
    );
}

export default BuyNFTButton;