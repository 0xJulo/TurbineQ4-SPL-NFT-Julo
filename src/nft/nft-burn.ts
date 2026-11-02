import { umi } from "../umi";

import { publicKey } from "@metaplex-foundation/umi";
import { fetchAsset, burn } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

const assetAddress = publicKey(process.env.BURN_ASSET_ADDRESS!);
const asset = await fetchAsset(umi, assetAddress);

const result = await burn(umi, { asset }).sendAndConfirm(umi);

console.log("Burned asset:", assetAddress);
console.log("Signature:", base58.deserialize(result.signature)[0]);