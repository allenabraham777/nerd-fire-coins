import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { Connection, Keypair, ParsedAccountData, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { solanaConnection } from '@/utils/solana-connection';

const secret = JSON.parse(`${process.env.WALLET_SECRET}`);
const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
const MINT_ADDRESS = process.env.MINT_ADDRESS as string;

async function getNumberDecimals(mintAddress: string): Promise<number> {
  const info = await solanaConnection.getParsedAccountInfo(new PublicKey(mintAddress));
  const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
  return result;
}

export async function sendTokens(amount: number, destinationWallet: string) {
  console.log(`Sending ${amount} ${(MINT_ADDRESS)} from ${(FROM_KEYPAIR.publicKey.toString())} to ${(destinationWallet)}.`);

  let sourceAccount = await getOrCreateAssociatedTokenAccount(
    solanaConnection,
    FROM_KEYPAIR,
    new PublicKey(MINT_ADDRESS),
    FROM_KEYPAIR.publicKey
  );
  console.log(`Source Account: ${sourceAccount.address.toString()}`);

  let destinationAccount = await getOrCreateAssociatedTokenAccount(
    solanaConnection,
    FROM_KEYPAIR,
    new PublicKey(MINT_ADDRESS),
    new PublicKey(destinationWallet)
  );
  console.log(`Destination Account: ${destinationAccount.address.toString()}`);

  const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
  console.log(`Number of Decimals: ${numberDecimals}`);

  const tx = new Transaction();
  tx.add(createTransferInstruction(
    sourceAccount.address,
    destinationAccount.address,
    FROM_KEYPAIR.publicKey,
    amount * Math.pow(10, numberDecimals)
  ));

  const latestBlockHash = await solanaConnection.getLatestBlockhash('confirmed');
  tx.recentBlockhash = await latestBlockHash.blockhash;
  const signature = await sendAndConfirmTransaction(solanaConnection, tx, [FROM_KEYPAIR]);
  const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
  console.log(
    '\x1b[32m',
    `   Transaction Success!🎉`,
    `\n   ${explorerUrl} `
  );
  return explorerUrl;

}