import { createClient } from "@solana/kit";
import { signerFromFile } from "@solana/kit-plugin-signer";
import { solanaDevnetRpc } from "@solana/kit-plugin-rpc";

export const client = await createClient()
    .use(signerFromFile(process.env.WALLET_PATH!))
    .use(solanaDevnetRpc({ transactionConfig: { version: 1 } }));