// Load mint and recipient address
// Transfer tokens, transferToATA with:
// The mint, the authority, the recipient, the amount, the decimals
// Save and log the transaction

import { address } from "@solana/kit";

import { client } from "../client";

const mint = address(process.env.MINT_ADDRESS!);
const recipient = address(process.env.RECIPIENT_ADDRESS!);

const result = await client.token.instructions
    .transferToATA({
        mint: mint,
        authority: client.payer,
        recipient: recipient,
        amount: 100_000_000_000n,
        decimals: 9,
    })
    .sendTransaction();

console.log("Transferred 100 tokens. Signature:", result.context.signature);