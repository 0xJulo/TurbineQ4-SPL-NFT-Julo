// Loads the image URI
// Upload the JSON
// Log the metadata URI and save it

import { umi } from "../umi";

const imageUri = process.env.IMAGE_URI!;

const metadataUri = await umi.uploader.uploadJson({
    name: "Julo's Turbine NFT",
    description: "A devnet test NFT for Turbine's minting NFT task",
    image: imageUri,
    properties: {
        files: [{ uri: imageUri, type: "image/png" }],
    }
});

console.log("Metadata URI:", metadataUri);