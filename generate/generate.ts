import fs from "node:fs";
import path from "node:path";
import process from "node:process";

type Metadata = {
  name: string;
  symbol: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
  properties: {
    files: { uri: string; type: string }[];
  };
};

const directoryPath = process.argv[2] || "assets";
const configPath = "config.json";
let config: {
  name?: string;
  symbol?: string;
  description?: string;
  attr?: { trait: string; value: string };
  collection?: { name?: string; description?: string };
} = {};

if (fs.existsSync(configPath)) {
  try {
    const configData = fs.readFileSync(configPath, "utf-8");
    config = JSON.parse(configData);
    console.log("Configuration loaded successfully.");
  } catch (error) {
    console.error("Error reading configuration file:", error);
  }
}

function generateMetadata(filePath: string) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const ext = path.extname(filePath).toLowerCase().replace(/^./, "");

  const metadata: Metadata = {
    name: config.name
      ? `${config.name} #${fileName.padStart(4, "0")}`
      : `Spell #${fileName.padStart(4, "0")}`,
    symbol: config.symbol || "SPELL",
    description: config.description
      ? `${config.description}${parseInt(fileName) + 1}`
      : `Collection on the blockchain`,
    image: `${fileName}.${ext}`,
    attributes: config.attr
      ? [
          {
            trait_type: config.attr.trait,
            value: config.attr.value,
          },
        ]
      : [
          {
            trait_type: "Name",
            value: fileName,
          },
        ],
    properties: {
      files: [
        {
          uri: `${fileName}.${ext}`,
          type: `image/${ext}`,
        },
      ],
    },
  };

  fs.writeFileSync(
    path.join(directoryPath, `${fileName}.json`),
    JSON.stringify(metadata, null, 2)
  );
}

function generateCollectionMetadata(directory: string) {
  const files = fs.readdirSync(directory);
  const collectionFile = files.find((file) => /^collection\./i.test(file));
  let collectionImage = "collection.jpeg";
  let collectionType = "image/jpeg";

  if (collectionFile) {
    const ext = path.extname(collectionFile).toLowerCase().substring(1);
    collectionImage = collectionFile;
    collectionType = `image/${ext}`;
  }

  const collectionMetadata = {
    name: config.collection?.name || "Spellcaster collection",
    symbol: config.symbol || "SPELL",
    description:
      config.collection?.description ||
      "Collection of casts on the blockchain.",
    image: collectionImage,
    attributes: [],
    properties: {
      files: [
        {
          uri: collectionImage,
          type: collectionType,
        },
      ],
    },
  };

  fs.writeFileSync(
    path.join(directory, "collection.json"),
    JSON.stringify(collectionMetadata, null, 2)
  );
  console.log(`Collection metadata generated in ${directory}`);
}

function processImages(directory: string) {
  if (!fs.existsSync(directory)) {
    console.error(`Directory "${directory}" does not exist.`);
    return;
  }

  const files = fs.readdirSync(directory);
  const imageFiles = files.filter((file) =>
    /\.(jpeg|jpg|gif|png)$/i.test(file)
  );

  imageFiles.forEach((file) => generateMetadata(path.join(directory, file)));
  console.log(`Metadata files generated in ${directory}`);

  generateCollectionMetadata(directory);
}

processImages(directoryPath);
