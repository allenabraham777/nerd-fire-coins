import NerdTokenForm from '@/components/molecules/forms/nerd-token-form/nerd-token-form';
import axios from 'axios';
import { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState("");
  const [walletAddress, setwalletAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const sendToken = async () => {
    if (!walletAddress || !amount || amount < 0) return;
    setMessage("");
    try {
      const { data } = await axios.post("/api/nfc-token", {
        walletAddress,
        amount
      });
      setMessage(
        `Transaction successful, <a class="underline text-blue-400" href="${data.url}" target="_blank">click here</a> for more details`
      );
      setwalletAddress("");
      setAmount(0);
    } catch (error: any) {
      console.error(error);
      setMessage(
        `<span class="text-red-500">Error while airdropping, please try again later.${error.message ? ` Error: ${error.message}` : ""
        }</span>`
      );
    }
  };

  return (
    <div className="w-[100%] max-w-[90%] md:max-w-[50%] mt-40 md:mt-80">
      <NerdTokenForm walletAddress={walletAddress} setwalletAddress={setwalletAddress} amount={amount} setAmount={setAmount} message={message} onSubmit={sendToken} />
    </div >
  );
};

export default Home;