// Load the mint address
// Mint tokens to your ATA, giving it:
// the mint, the owner, the mint authority, the amount, the decimals
// Send it and log the signature

import { address } from "@solana/kit";

import { client } from "../client";

const mint = address(process.env.MINT_ADDRESS!);

const result = await client.token.instructions
    .mintToATA({
        mint: mint,
        owner: client.payer.address,
        mintAuthority: client.payer,
        amount: 1_000_000_000_000n,
        decimals: 9,
    })
    .sendTransaction();

console.log("Minted 1,000 tokens. Signature:", result.context.signature);