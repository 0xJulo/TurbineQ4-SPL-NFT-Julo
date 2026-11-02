// Load the asset address
// Fetch the asset from the chain
// Upload a new metadata JSON file
// Call update Umi and log the signature

import { umi } from "../umi";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchAsset, update } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const assetAddress = publicKey(process.env.ASSET_ADDRESS!);

const asset = await fetchAsset(umi, assetAddress);

const newName = "Julo's updated Turbine NFT";
const imageUri = process.env.IMAGE_URI!;

const newUri = await umi.uploader.uploadJson({
    name: newName,
    description: "Updated NFT art for Turbine's minting NFT task",
    image: imageUri,
    properties: {
        files: [{ uri: imageUri, type: "image/png" }],
    },
});

const result = await update(umi, {
    asset: asset,
    name: newName,
    uri: newUri,
}).sendAndConfirm(umi);

console.log("New metadata URI:", newUri);
console.log("Signature:", base58.deserialize(result.signature)[0]);