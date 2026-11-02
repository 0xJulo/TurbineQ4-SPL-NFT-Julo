// Load the mint address, Umi uses its own publicKey() function instead of Kit's address()
// Upload the metadata JSON - name, symbol, description, image link if desired
// Call createV1 with the mint, name, symbol, URI, 
// Send it and log the signature

import { umi } from "../umi";
import { publicKey, percentAmount } from "@metaplex-foundation/umi";
import { createV1, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { base58 } from "@metaplex-foundation/umi/serializers";

const mint = publicKey(process.env.MINT_ADDRESS!);

const name = "Julo's Turbine SPL Token";
const symbol = "JULO";

const uri = await umi.uploader.uploadJson({
    name: name,
    symbol: symbol,
    description: "Devnet token for experimenting with and building SPL Tokens",
});

const result = await createV1(umi, {
    mint: mint,
    name: name,
    symbol: symbol,
    uri: uri,
    sellerFeeBasisPoints: percentAmount(0),
    tokenStandard: TokenStandard.Fungible
}).sendAndConfirm(umi);

console.log("Metadata URI:", uri);
console.log("Signature:", base58.deserialize(result.signature)[0]);