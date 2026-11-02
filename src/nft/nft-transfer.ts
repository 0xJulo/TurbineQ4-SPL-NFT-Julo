// Load the asset address and the recipient address
// Fetch the asset
// Call transfer
// Log it

import { umi } from "../umi";

import { publicKey } from "@metaplex-foundation/umi";
import { fetchAsset, transfer } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const assetAddress = publicKey(process.env.ASSET_ADDRESS!);
const recipient = publicKey(process.env.RECIPIENT_ADDRESS!);

const asset = await fetchAsset(umi, assetAddress);

const result = await transfer(umi, {
    asset: asset,
    newOwner: recipient,
}).sendAndConfirm(umi);

console.log("Transferred asset to:", recipient);
console.log("Signature:", base58.deserialize(result.signature)[0]);
