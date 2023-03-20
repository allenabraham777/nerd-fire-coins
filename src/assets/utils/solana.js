import { LAMPORTS_PER_SOL, Connection, PublicKey } from "@solana/web3.js";

const DEVNET_API = "https://api.devnet.solana.com";
const solanaConnection = new Connection(DEVNET_API);

export const airdrop = async (walletAddress) => {
  const publicKey = new PublicKey(walletAddress);
  const airdropSignature = solanaConnection.requestAirdrop(
    publicKey,
    LAMPORTS_PER_SOL
  );
  try {
    const txId = await airdropSignature;
    console.log(`Airdrop Transaction Id: ${txId}`);
    console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
    return txId;
  } catch (err) {
    console.log(err);
    throw error;
  }
};
