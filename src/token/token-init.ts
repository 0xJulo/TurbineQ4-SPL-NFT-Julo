// Make a mint keypair, it's address becomes the token's ID
// Create the mint onchain, the system program makes the account
// and the token program fills in the rules: decimals and mint authority
// Save the mint address. 

import { generateKeyPairSigner } from "@solana/kit";

import { client } from "../client";

// This file is a script, it does not need export
// as no other modules will import it. 
const mint = await generateKeyPairSigner();

const result = await client.token.instructions
    .createMint({
        newMint: mint,
        decimals: 9,
        mintAuthority: client.payer.address,
    })
    .sendTransaction();

console.log("Mint: ", mint.address);
console.log("Signature: ", result.context.signature);