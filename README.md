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

## Results (SPL Token)

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

**Step 3:** Minting tokens

- `src/token/token-mint.ts` mints 1,000 tokens to the devnet wallet
- The mint address is loaded and converted with Kit's `address()` function
- It calls the Token Program's plugin `mintToATA` which creates the wallet's Associated Token Account if one doesn't already exist, then mints to it
- The wallet signs as the mint authority, which is required to approve minting
- The amount is in base units: 9 decimals, 1,000 tokens = 1,000,000,000,000

Mint transaction: [tb3aHmKJhC7eZCen3vi1Ptau6dB2Hk2hMtZTtJycHkQ2QLnHbmXsL8ZKnuNwwpC9CUEiEHeNA5QdVUa4eYQxpFT](https://explorer.solana.com/tx/tb3aHmKJhC7eZCen3vi1Ptau6dB2Hk2hMtZTtJycHkQ2QLnHbmXsL8ZKnuNwwpC9CUEiEHeNA5QdVUa4eYQxpFT?cluster=devnet)

**Step 4:** Transferring tokens

- `src/token/token-transfer.ts` transfers 100 tokens to a second devnet wallet
- The mint and recipient address are loaded and converted with `address()`
- It calls the Token Program's `transferToATA`, which works out both wallets' ATAs and creates the recipient's if it doesn't exist
- The sending wallet signs as the authority (the owner of the tokens being sent) and pays the rent for the recipient's new ATA
- After the transfer, the sender holds 900 tokens and the recipient holds 100

Transfer transaction: [3KheN2ayirbWbBKfPMygknFVUiwZgW7rQsnDC6phsSRh1RRmTF2BiiLCqb2mUh2DDZVf4cJHzsSnrnMVReSmTXPa](https://explorer.solana.com/tx/3KheN2ayirbWbBKfPMygknFVUiwZgW7rQsnDC6phsSRh1RRmTF2BiiLCqb2mUh2DDZVf4cJHzsSnrnMVReSmTXPa?cluster=devnet)

**Step 5:** Adding token metadata 

- Set up a second client - `src/umi.ts` - using Metaplex's Umi framework. Metaplex programs are built for Umi, not Kit
  - Created with `createUmi()` on devnet, loading the same wallet from WALLET_PATH
  - Plugins: `keypairIdentity`(wallet as signer and payer), `mplCore`, `mplTokenMetadata`, and `irysUploader` (devnet storage)
- `src/token/token-metadata.ts` gives the SPL token a name and ticker
- The plain Token Program has no name or symbol fields, so these are stored in a separate Metaplex Token Metadata account, a PDA derived from the mint address
- A metadata JSON (name, symbol, description) is uploaded to Irys, which returns a URI
- `createV1` creates the metadata account with the name, symbol, URI, a 0% royalty and the "Fungible" token standard
- The wallet signs as the mint authority, which is required to add metadata to an existing mint

Metadata account: [6CbUNfNkteTpu7YpqHr2m1dsBgvuGt1KZ7ZD1ojfLtzW](https://explorer.solana.com/address/6CbUNfNkteTpu7YpqHr2m1dsBgvuGt1KZ7ZD1ojfLtzW?cluster=devnet)

Metadata JSON: [E7JX6weuNo4XaAf9S8fcPTkoNZ6PgRdoVLqcL1Cx3fc8](https://gateway.irys.xyz/E7JX6weuNo4XaAf9S8fcPTkoNZ6PgRdoVLqcL1Cx3fc8)

Metadata transaction: [3x27qpzsSZ6c3iN12GV7gaqeGjveQaiPWJkWKB8PB7SfEbezCGgEdErcxdzQtnFg9cFgAzdC5Ykd8RahZt7QRM3G](https://explorer.solana.com/tx/3x27qpzsSZ6c3iN12GV7gaqeGjveQaiPWJkWKB8PB7SfEbezCGgEdErcxdzQtnFg9cFgAzdC5Ykd8RahZt7QRM3G?cluster=devnet)


## Results (NFT)

**Step 1:** Uploading the NFT image

- `src/nft/nft-image.ts` uploads the NFT's image (`assets/Julo.png`) to Irys, using the Umi client
- The image is read as raw bytes with `Bun.file().bytes()`
- The bytes are wrapped as a Umi `GenericFile` with `createGenericFile`, giving it a file name and `image/png` content type
- `umi.uploader.upload()` uploads it to Irys devnet storage and returns the image URI, which goes into the NFT's metadata JSON in the next step
- Note: Irys devnet uploads are temporary unlike mainnet's permanent storage

Image URI: [Dct5cd1ECQrJPJbSQ2o6YhB81HkvzN4LdFQD7YDHYhVN](https://gateway.irys.xyz/Dct5cd1ECQrJPJbSQ2o6YhB81HkvzN4LdFQD7YDHYhVN)

**Step 2:** Uploading the NFT metadata

- `src/nft/nft-metadata.ts` uploads the NFT's metadata JSON to Irys
- The image URI from step 1 is loaded
- The JSON follows the Metaplex NFT metadata standard, so wallets and explorers can read it:
  - `name` and `description`
  - `image`: the image URI from step 1
  - `properties.files`: lists the image file and its content type
- `umi.uploader.uploadJson()` uploads it and returns the metadata URI, which the NFT will store onchain in the next step.

Metadata JSON: [EopdRWV1DVxdWtNfDZRAUK9CtoSN39ocRUM7SLAxFPRF](https://gateway.irys.xyz/EopdRWV1DVxdWtNfDZRAUK9CtoSN39ocRUM7SLAxFPRF)

**Step 3:** Minting NFT with MPL Core

- `src/nft/nft-mint.ts` creates the NFT as an MPL Core asset, using the Umi client
- With MPL Core, the NFT is a single asset account that stores its name, URI, owner and update authority (no separate mint, token account or metadata account)
- The metadata URI from step 2 is loaded.
- `generateSigner(umi)` creates a new keypair whose address becomes the NFT's address; it signs because a new account is being created there
- `create()` builds the instruction with the asset, name and URI, and `sendAndConfirm()` sends it
- The owner and update authority both default to the devnet wallet, which allows the NFT to be updated in the next step
- The asset account holds about 0.003 SOL in rent, which can be reclaimed by burning it

Asset: [A1ag6hd7TR6GYz8dkzpfeBpKhHPYDLEoybEttTTLward](https://explorer.solana.com/address/A1ag6hd7TR6GYz8dkzpfeBpKhHPYDLEoybEttTTLward?cluster=devnet)

Mint transaction: [496XB7rdAmwPk4GVnttcqXhXUhhpb9L5AL4WrGPFMsazUmxYSjC7eAqazYqt7fEEqJNxwJ3WiEPk9nwjRAXM2c46](https://explorer.solana.com/tx/496XB7rdAmwPk4GVnttcqXhXUhhpb9L5AL4WrGPFMsazUmxYSjC7eAqazYqt7fEEqJNxwJ3WiEPk9nwjRAXM2c46?cluster=devnet)

**Step 4:** Updating the NFT's name and metadata

- `src/nft/nft-update.ts` updates the NFT's name and metadata URI as the update authority
- The asset address is loaded and converted with Umi's `publicKey()`
- `fetchAsset()` reads the current asset from devnet, which `update()` needs to build the instruction
- A new metadata JSON (new name and description, same image) is uploaded to Irys, returning a new URI
- `update()` writes the new name and URI onto the asset account; the owner, address and image stay the same
- The devnet wallet signs as the update authority, which is required for the update to be accepted

New name: Julo's updated Turbine NFT

New metadata JSON: [8FcncBkPDh6EA9SZLWHp11Lh5TbD4EX6uT2spE3tUNjJ](https://gateway.irys.xyz/8FcncBkPDh6EA9SZLWHp11Lh5TbD4EX6uT2spE3tUNjJ)

Update transaction: [2mrZLBmyC7GqPMgVVbz4HB6pZE3FedQqaCPufFzG8uPpPLyPQAby7XXaDbK9WTmBPgAG9gLhZApSsPEwXkTNUK9c](https://explorer.solana.com/tx/2mrZLBmyC7GqPMgVVbz4HB6pZE3FedQqaCPufFzG8uPpPLyPQAby7XXaDbK9WTmBPgAG9gLhZApSsPEwXkTNUK9c?cluster=devnet) 