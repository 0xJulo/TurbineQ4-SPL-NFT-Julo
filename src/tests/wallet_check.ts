import { client } from "../client";

const address = client.payer.address;

// Build the RPC request, then .send() it
const { value: lamports } = await client.rpc.getBalance(address).send();

console.log("Wallet:", address);
console.log("Balance:", Number(lamports) / 1_000_000_000, "SOL");
