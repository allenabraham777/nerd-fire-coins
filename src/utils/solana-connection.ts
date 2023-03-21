import { Connection } from "@solana/web3.js";

const DEVNET_API = "https://api.devnet.solana.com";
export const solanaConnection = new Connection(DEVNET_API);