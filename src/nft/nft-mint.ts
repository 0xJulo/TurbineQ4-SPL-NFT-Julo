// Load Metadata URI
// Generate a new signer for the asset
// Call create umi
// Log the asset address and signature

import { umi } from "../umi";
import { generateSigner } from "@metaplex-foundation/umi";
import { create } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const metadataUri = process.env.METADATA_URI!;

// New keypair whose address becomes the NFT's address
const asset = generateSigner(umi);

const result = await create(umi, {
    asset: asset,
    name: "Julo's Turbine NFT",
    uri: metadataUri,
}).sendAndConfirm(umi);

console.log("Asset:", asset.publicKey);
console.log("Signature:", base58.deserialize(result.signature)[0]);