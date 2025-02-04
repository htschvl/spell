import fs from "node:fs";
import path from "node:path";

type Wallets = string[];
type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
  properties: {
    files: { uri: string; type: string }[];
  };
};

const directoryPath = "airdrop";
const ownersFilePath = "airdrop/owners.json";

/**
 * Loads the list of wallet addresses from the owners file.
 *
 * @throws {Error} if the owners file does not exist.
 * @returns {Wallets} the list of wallet addresses.
 */
function loadWallets(): Wallets {
  if (!fs.existsSync(ownersFilePath)) {
    throw new Error(`Owners file "${ownersFilePath}" does not exist.`);
  }
  const data = fs.readFileSync(ownersFilePath, "utf-8");
  return JSON.parse(data);
}

/**
 * Checks if the number of wallets and images in the airdrop directory are equal.
 *
 * @throws {Error} if the owners file does not exist.
 * @throws {Error} if the airdrop directory does not exist.
 * @returns {boolean} if the number of wallets and images are equal.
 */
function countWalletsAndImages(): boolean {
  const wallets = loadWallets();
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Airdrop directory "${directoryPath}" does not exist.`);
  }
  const images = fs
    .readdirSync(directoryPath)
    .filter((file) => /\.(jpeg|jpg|png|gif)$/i.test(file));

  console.log(
    `Wallets found: ${wallets.length}, Images found: ${images.length}`
  );
  return wallets.length === images.length;
}

/**
 * Generates metadata files for each image in the airdrop directory.
 *
 * This function first checks if the number of wallet addresses matches
 * the number of images. If they do not match, an error is thrown.
 * For each image, a metadata JSON file is created containing details
 * such as the name, description, image reference, and properties.
 *
 * @throws {Error} if there is a mismatch between wallet addresses and images.
 */

function generateMetadataForImages() {
  if (!countWalletsAndImages()) {
    throw new Error(
      "Mismatch between wallet addresses and images. Cannot proceed."
    );
  }

  const images = fs
    .readdirSync(directoryPath)
    .filter((file) => /\.(jpeg|jpg|png)$/i.test(file));
  images.forEach((image) => {
    const metadata: Metadata = {
      name: `Airdrop NFT - ${image}`,
      description: `Spellcast exclusive NFT airdrop for selected users.`,
      image: image,
      attributes: [],
      properties: {
        files: [
          {
            uri: image,
            type: `image/${path.extname(image).slice(1)}`,
          },
        ],
      },
    };

    const metadataPath = path.join(
      directoryPath,
      `${path.basename(image, path.extname(image))}-meta.json`
    );
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`Metadata generated: ${metadataPath}`);
  });
}

/**
 * Initiates the minting process for NFTs using the generated metadata files and wallet addresses.
 *
 * This function loads wallet addresses and metadata files from the airdrop directory.
 * It checks for a 1-to-1 correspondence between wallets and metadata files.
 * For each wallet, it simulates the minting process by logging the action and waiting for a short duration.
 *
 * @throws {Error} if there is a mismatch between the number of wallets and metadata files.
 */

async function mintNFTs() {
  const wallets = loadWallets();
  const metadataFiles = fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith("-meta.json"));

  if (wallets.length !== metadataFiles.length) {
    throw new Error(
      "Mismatch between metadata files and wallets. Cannot proceed with minting."
    );
  }

  for (let i = 0; i < wallets.length; i++) {
    console.log(
      `Minting NFT for wallet: ${wallets[i]} with metadata file: ${metadataFiles[i]}`
    );
    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("Airdrop minting process completed.");
}

(async () => {
  try {
    generateMetadataForImages();
    await mintNFTs();
  } catch (error) {
    console.error("Error:", error);
  }
})();
