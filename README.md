# Week 1 Assignment (SPL and NFT)

The goal of this assignement is to:

1. Mint and transfer your own SPL token.
2. Mint an NFT using MPL Core.
3. Update the NFT's name and metadata as the update authority

And optionally:

4. Transfer the NFT ownership between wallets
5. Permanently destroy the NFT and reclaim the rent fees.

## Code Documentation

- Solana Kit: https://www.solanakit.com/docs
- Assets on Solana: https://solana.com/docs/tokens

## Results

**Step 1:** Setting up the client

- Created the shared Solana client in `src/client.ts` using `@solana/kit`
- The client is built with `createClient()`, then extended with three plugins
  - A signer to load the devnet wallet
  - An RPC plugin that connects to devnet and sends v1 transactions
  - The Token Program plugin, which adds helpers for creating mints and minting / transferring tokens
- Every script will import the one client instead of repeating the setup
- `src/tests/wallet-check.ts` is used to log the wallet address and devnet SOL balance

**Step 2:** Creating the token mint

- `src/token/token-init.ts` creates a new SPL token mint on devnet
- The script creates a new keypair whose address becomes the mint address, the token's unique ID
- It then calls the Token Program plugin's `createMint`, which bundles two instructions into one transaction
- The System Program creates the account, with the rent paid by the devnet wallet
- The Token Program initialises it as a mint with 9 decimals and the devnet wallet as mint authority

Devnet SPL mint address: [3xrTgxaNy8B1zVV1knSEcCFQmigFQ7H9zCwZT2aXYgsG](https://explorer.solana.com/address/3xrTgxaNy8B1zVV1knSEcCFQmigFQ7H9zCwZT2aXYgsG?cluster=devnet)