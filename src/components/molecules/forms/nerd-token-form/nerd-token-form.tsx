import React from 'react';

type Props = {
  walletAddress: string;
  setwalletAddress: (walletAddress: string) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  amount: number;
  setAmount: (amount: number) => void;
  message: string;
};

const NerdTokenForm = ({ walletAddress, setwalletAddress, amount, setAmount, onSubmit, message }: Props) => {
  return (
    <div className='flex flex-col gap-20 w-[100%]'>
      <h1 className="text-5xl text-center"> Nerd Fire Coins Faucet</h1>
      <div className="flex flex-col gap-8 text-xl">
        <input
          className="p-4 rounded-lg border bg-transparent"
          type="text"
          value={walletAddress}
          placeholder="Enter the wallet address"
          onChange={(e) => setwalletAddress(e.target.value)}
        />
        <input
          className="p-4 rounded-lg border bg-transparent"
          type="number"
          value={amount}
          placeholder="Enter amount of TUNF"
          onChange={(e) => setAmount(parseFloat(e.target.value.replace(/[^\d.]/g, '')))}
        />
        <button
          className="p-4 bg-[#0090C1] rounded-lg"
          onClick={onSubmit}
          disabled={!walletAddress}
        >
          Send token
        </button>
      </div>
      <div
        className="text-green-400"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default NerdTokenForm;