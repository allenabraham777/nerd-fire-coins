import { useState } from 'react';
import { airdrop } from '@/utils/solana';

const Faucet = () => {
  const [message, setMessage] = useState("");
  const [walletAddress, setwalletAddress] = useState("");

  const airdropSolana = async () => {
    if (!walletAddress) return;
    setMessage("");
    try {
      const transactionId = await airdrop(walletAddress);
      setMessage(
        `Transaction successful, transaction id: ${transactionId}, <a href="https://explorer.solana.com/tx/${transactionId}?cluster=devnet" target="_blank">click here</a> for more details`
      );
      setwalletAddress("");
    } catch (error: any) {
      console.error(error);
      setMessage(
        `<span class="error">Error while airdropping, please try again later.${error.message ? ` Error: ${error.message}` : ""
        }</span>`
      );
    }
  };

  return (
    <div className="flex flex-col gap-20 w-[100%] max-w-[90%] md:max-w-[75%] mt-40 md:mt-80">
      <h1 className="text-5xl text-center"> Solana Devnet Faucet</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 text-xl">
        <input
          className="md:flex-[4] p-4 rounded-lg md:rounded-r-none bg-transparent border"
          type="text"
          value={walletAddress}
          placeholder="Enter the wallet address"
          onChange={(e) => setwalletAddress(e.target.value)}
        />
        <button
          className="p-4 bg-[#0090C1] rounded-lg rounded-l-none md:flex-1 border md:border-l-0"
          onClick={airdropSolana}
          disabled={!walletAddress}
        >
          Airdrop
        </button>
      </div>
      <div
        className="container__message"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div >
  );
};

export default Faucet;