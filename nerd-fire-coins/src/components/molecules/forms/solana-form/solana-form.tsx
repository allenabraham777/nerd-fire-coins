import React from "react";

type Props = {
  walletAddress: string;
  setwalletAddress: (walletAddress: string) => void,
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void,
  message: string;
};

const SolanaForm = ({ walletAddress, setwalletAddress, onSubmit, message }: Props) => {
  return (
    <div className="flex flex-col gap-20 w-[100%]">
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
          onClick={onSubmit}
          disabled={!walletAddress}
        >
          Airdrop
        </button>
      </div>
      <div
        className="text-green-400"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default SolanaForm;