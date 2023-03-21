import { useState } from "react";
import "./App.css";
import { airdrop } from "./assets/utils/solana";

const App = () => {
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
    } catch (error) {
      console.error(error);
      setMessage(
        `<span class="error">Error while airdropping, please try again later.${
          error.message ? ` Error: ${error.message}` : ""
        }</span>`
      );
    }
  };

  return (
    <div className="container">
      <h1 className="container__heading">Solana Devnet Faucet</h1>
      <div className="container__wrapper">
        <input
          className="container__input"
          type="text"
          value={walletAddress}
          placeholder="Enter the wallet address"
          onChange={(e) => setwalletAddress(e.target.value)}
        />
        <button
          className="container__button"
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
    </div>
  );
};

export default App;
