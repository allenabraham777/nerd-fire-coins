import { useRef } from "react";
import "./App.css";
import { airdrop } from "./assets/utils/solana";

const App = () => {
  const inputRef = useRef(null);

  const airdropSolana = async () => {
    const walletAddress = inputRef?.current?.value;
    if (!walletAddress) return;
    try {
      const transactionId = await airdrop(walletAddress);
      alert("Transaction: " + transactionId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Nerd Fire Coins</h1>
      <input type="text" ref={inputRef} />
      <button onClick={airdropSolana}>Airdrop</button>
    </div>
  );
};

export default App;
