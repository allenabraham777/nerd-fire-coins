import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-100 px-4 py-6 text-3xl flex justify-between items-center">
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0090C1] to-[#20FC8F]">Nerd Fire Coins</span>
      <div className="text-lg flex space-x-10 text-[#20FC8F]">
        <Link href="/">Home</Link>
        <Link href="/solana-faucet">Solana Faucet</Link>
      </div>
    </nav>
  );
};

export default Navbar;
