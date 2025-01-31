import { Connection, PublicKey } from '@solana/web3.js';

const SPELL_MINT_ADDRESS = '8zrgKoeADL7c8Sn8sgHnE22lnEa4oEjAptVpump'; // Substitua pelo endereço correto do mint do SPELL
const SUPPLY_THRESHOLD = 0.01; // 1% do supply
const DOLLAR_THRESHOLD = 50; // 50 dólares
const SPELL_PRICE = 0.00005; // Preço do SPELL em dólares

async function getSpellHolders() {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    
    // Obtenha o supply total do token SPELL
    const totalSupply = await getTotalSupply(connection, SPELL_MINT_ADDRESS);
    const supplyLimit = totalSupply * SUPPLY_THRESHOLD;

    // Liste os endereços com mais de 1% do supply
    const highHolders = await getHighHolders(connection, SPELL_MINT_ADDRESS, supplyLimit);
    
    // Liste os endereços que seguraram 50 dólares ou mais
    const dollarHolders = await getDollarHolders(connection, SPELL_MINT_ADDRESS, DOLLAR_THRESHOLD, SPELL_PRICE);

    console.log('Holders com mais de 1% do supply:', highHolders);
    console.log('Holders com 50 dólares ou mais:', dollarHolders);
}

async function getTotalSupply(connection, mintAddress) {
    try {
        const mintPublicKey = new PublicKey(mintAddress); // Ensure mintAddress is valid
        const mintInfo = await connection.getParsedAccountInfo(mintPublicKey);
        
        if (mintInfo.value) {
            return mintInfo.value.data.parsed.info.supply; // Return the total supply
        } else {
            throw new Error('Mint address not found');
        }
    } catch (error) {
        console.error('Error fetching total supply:', error);
        throw error; // Rethrow the error for further handling
    }
}

async function getHighHolders(connection, mintAddress, supplyLimit) {
    const holders = []; // Array para armazenar os endereços dos holders
    const allAccounts = await connection.getParsedTokenAccountsByOwner(
        mintAddress,
        { programId: TOKEN_PROGRAM_ID }
    );

    for (const account of allAccounts.value) {
        const amount = parseFloat(account.account.data.parsed.info.tokenAmount.uiAmount);
        if (amount > supplyLimit) {
            holders.push(account.account.data.parsed.info.owner);
        }
    }
    
    return holders;
}

async function getDollarHolders(connection, mintAddress, dollarThreshold, spellPrice) {
    const holders = []; // Array para armazenar os endereços dos holders
    const allAccounts = await connection.getParsedTokenAccountsByOwner(
        mintAddress,
        { programId: TOKEN_PROGRAM_ID }
    );

    for (const account of allAccounts.value) {
        const amount = parseFloat(account.account.data.parsed.info.tokenAmount.uiAmount);
        const dollarValue = amount * spellPrice;
        if (dollarValue >= dollarThreshold) {
            holders.push(account.account.data.parsed.info.owner);
        }
    }
    
    return holders;
}

getSpellHolders(); 