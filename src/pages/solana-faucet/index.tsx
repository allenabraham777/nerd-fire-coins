import { useState } from 'react';
import { airdrop } from '@/utils/solana';
import SolanaForm from '@/components/molecules/forms/solana-form/solana-form';

const Faucet = () => {
  const [message, setMessage] = useState("");
  const [walletAddress, setwalletAddress] = useState("");

  const airdropSolana = async () => {
    if (!walletAddress) return;
    setMessage("");
    try {
      const transactionId = await airdrop(walletAddress);
      setMessage(
        `Transaction successful, transaction id: ${transactionId}, <a class="underline text-blue-400" href="https://explorer.solana.com/tx/${transactionId}?cluster=devnet" target="_blank">click here</a> for more details`
      );
      setwalletAddress("");
    } catch (error: any) {
      console.error(error);
      setMessage(
        `<span class="text-red-500">Error while airdropping, please try again later.${error.message ? ` Error: ${error.message}` : ""
        }</span>`
      );
    }
  };

  return (
    <div className="w-[100%] max-w-[90%] md:max-w-[75%] mt-40 md:mt-80">
      <SolanaForm message={message} walletAddress={walletAddress} setwalletAddress={setwalletAddress} onSubmit={airdropSolana} />
    </div>
  );
};

export default Faucet;