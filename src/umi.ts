// Create Umi on devnet
// Load your wallet
// Add plugins
// Export umi

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

export const umi = createUmi("https://api.devnet.solana.com");

const secretKey = await Bun.file(process.env.WALLET_PATH!).json();
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));

// Add in Umi plugins
umi.use(keypairIdentity(keypair))
    .use(mplCore())
    .use(mplTokenMetadata())
    .use(irysUploader({ address: "https://devnet.irys.xyz" }));