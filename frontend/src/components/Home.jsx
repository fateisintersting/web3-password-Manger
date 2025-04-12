import React, { useState } from "react";
import App from "../App";
import Decrypt from "./Decrypt";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("app"); // Default to app page
  const [account, setAccount] = useState("");

  // Connect wallet function to be passed to children components
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [acc] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(acc);
        return acc;
      } catch (err) {
        console.error("Error connecting wallet:", err);
      }
    } else {
      alert("Please install MetaMask to use this application");
    }
  };

  // Effect to connect wallet on initial load
  React.useEffect(() => {
    connectWallet();
  }, []);

  // Render the appropriate page based on the currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "app":
        return <App connectWalletProp={connectWallet} account={account} />;
      case "decrypt":
        return <Decrypt account={account} />;
      default:
        return <App connectWalletProp={connectWallet} account={account} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-emerald-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <div className="flex items-center py-5 px-2">
                <a href="/">
                 <span className="text-2xl font-bold">🔐 Password Manager</span>
                </a>
                
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage("app")}
                className={`py-4 px-6 font-medium hover:bg-emerald-800 transition duration-300 border rounded-bl-full ${
                  currentPage === "app" ? "border-b-2 border-white" : ""
                }`}
              >
                Password Storage
              </button>
              <button
                onClick={() => setCurrentPage("decrypt")}
                className={`py-4 px-6 font-medium hover:bg-emerald-800 transition duration-300 border rounded-br-md ${
                  currentPage === "decrypt" ? "border-b-2 border-white" : ""
                }`}
              >
                Decrypt Tool
              </button>
            </div>

            {/* Wallet Display */}
            <div className="flex items-center">
              {account ? (
                <div className="bg-green-800 py-2 px-4 rounded-md text-sm">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-green-700 hover:bg-green-600 py-2 px-4 rounded-md transition duration-300"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container mx-auto py-8">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center  items-center">
            <div className="mb-4  md:mb-0">
              <p>© 2025 Blockchain Password Manager</p>
            </div>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;