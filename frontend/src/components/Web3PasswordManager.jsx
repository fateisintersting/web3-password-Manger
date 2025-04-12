import { useState } from 'react';
import { Lock, Shield, Database, Key, ArrowRight, Globe, Wallet, Code } from 'lucide-react';

export default function Web3PasswordManager() {
  const [activeTab, setActiveTab] = useState('features');
  const [account, setAccount] = useState(null);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-6">
            <Lock className="text-emerald-400 mr-3" size={36} />
            <h1 className="text-4xl font-bold">Web3 Password Manager</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            A decentralized password manager built with <span className="text-emerald-400">React</span>, 
            <span className="text-emerald-400"> Ethereum</span>, <span className="text-emerald-400">AES encryption</span>, 
            <span className="text-emerald-400"> IPFS</span>, and <span className="text-emerald-400">Smart Contracts</span>.
          </p>
          <div className="p-4 bg-gray-800 rounded-lg border border-emerald-500 max-w-2xl">
            <p className="text-lg italic">
              ✨ Store your passwords securely, privately, and permanently — without trusting a centralized provider.
            </p>
          </div>
          
          <div className="mt-12 flex gap-4">
            <a href='/home'>
            <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium flex items-center">
              Get Started <ArrowRight size={20} className="ml-2" />
            </button>
            </a>
           <a href='https://github.com/fateisintersting/web3-password-Manger'>
           <button className="border border-emerald-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
              View on GitHub
            </button>
           </a>
           
          </div>
        </div>
      </div>

      {/* Tech Stack & Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button 
              className={`px-6 py-2 rounded-md ${activeTab === 'tech' ? 'bg-emerald-500 text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('tech')}
            >
              Tech Stack
            </button>
            <button 
              className={`px-6 py-2 rounded-md ${activeTab === 'features' ? 'bg-emerald-500 text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('features')}
            >
              Key Features
            </button>
            <button 
              className={`px-6 py-2 rounded-md ${activeTab === 'how' ? 'bg-emerald-500 text-white' : 'text-gray-300'}`}
              onClick={() => setActiveTab('how')}
            >
              How It Works
            </button>
          </div>
        </div>

        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Code className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Frontend</h3>
              </div>
              <p className="text-gray-300">React + Tailwind CSS</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Database className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Blockchain</h3>
              </div>
              <p className="text-gray-300">Ethereum + Solidity Smart Contract</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Wallet className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Wallet</h3>
              </div>
              <p className="text-gray-300">MetaMask</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Globe className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Storage</h3>
              </div>
              <p className="text-gray-300">IPFS (via Web3.Storage)</p>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Lock className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">AES Encryption</h3>
              </div>
              <p className="text-gray-300">Each password is AES-encrypted with a key derived from your Ethereum account.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Database className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Blockchain-Based Indexing</h3>
              </div>
              <p className="text-gray-300">Passwords are mapped to your services and CIDs stored on Ethereum.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Globe className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">IPFS Storage</h3>
              </div>
              <p className="text-gray-300">Encrypted passwords are stored on IPFS (W3UP) – decentralized and immutable.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Wallet className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Wallet-based Auth</h3>
              </div>
              <p className="text-gray-300">Login with MetaMask – no username/password headaches.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="text-emerald-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Your Data, Your Control</h3>
              </div>
              <p className="text-gray-300">No servers. No tracking. 100% client-side and open-source.</p>
            </div>
          </div>
        )}

        {activeTab === 'how' && (
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                </div>
                <div>
                  <p className="text-gray-300"><span className="font-semibold">You enter</span> your password and service name (e.g., "Gmail", "Facebook").</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                </div>
                <div>
                  <p className="text-gray-300"><span className="font-semibold">We encrypt the password using AES</span> with a secure key derived from your MetaMask account:</p>
                  <div className="bg-gray-900 p-3 rounded mt-2 overflow-x-auto">
                    <code className="text-emerald-400 text-sm">
                      const signed = await ethereum.request({{method: 'personal_sign', params: [msg, account] }});
                      <br/>
                      const key = CryptoJS.SHA256(signed).toString();
                    </code>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                </div>
                <div>
                  <p className="text-gray-300">The encrypted password is saved as a .txt file and uploaded to IPFS using Web3.Storage.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                </div>
                <div>
                  <p className="text-gray-300">The IPFS CID is stored on-chain (Ethereum) linked to your service name using a smart contract.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                </div>
                <div>
                  <p className="text-gray-300"><span className="font-semibold">Later, when you want to view a password</span>, we:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-300">
                    <li>Fetch the CID from blockchain</li>
                    <li>Retrieve the encrypted file from IPFS</li>
                    <li>Decrypt using the same key derived from your MetaMask</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Secure, decentralized password storage with the power of blockchain and encryption
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700">
            <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
              <Lock size={48} className="text-emerald-400 mb-4" />
              <p className="text-lg mb-6">Connect your MetaMask wallet to get started</p>
              
              {account ? (
                <div className="bg-emerald-500 py-2 px-4 rounded-md text-sm">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </div>
              ) : (
              <button onClick={connectWallet} className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium flex items-center">
                Connect Wallet <Wallet size={20} className="ml-2" />
              </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Web3 Password Manager · Open Source · Made By Vishal</p>
        </div>
      </footer>
    </div>
  );
}