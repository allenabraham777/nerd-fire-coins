import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-100 p-4 text-3xl flex justify-between items-center">
      <span>Nerd Fire Coins</span>
      <div className="text-lg flex space-x-10">
        <Link href="/">Home</Link>
        <Link href="/solana-faucet">Faucet</Link>
      </div>
    </nav>
  );
};

export default Navbar;
