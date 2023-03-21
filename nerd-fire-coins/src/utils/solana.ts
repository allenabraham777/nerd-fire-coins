import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { solanaConnection } from '@/utils/solana-connection';

export const airdrop = async (walletAddress: String) => {
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
    throw err;
  }
};
