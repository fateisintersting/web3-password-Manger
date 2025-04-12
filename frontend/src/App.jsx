import React, { useEffect, useState } from "react";
import {
  encryptAndUpload,
  storePasswordOnChain,
  getServices,
  getPassword,
  deletePassword,
} from "./utils";
import Decrypt from "./components/Decrypt";
import Services from "./components/Services";

const App = () => {
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");
  const [services, setServices] = useState([]);
  const [selectedCID, setSelectedCID] = useState(null);
  const [account, setAccount] = useState("");
  const [privatekey, setPrivateKey] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(acc);
        fetchServices();
      }
    };
    connectWallet();
  }, []);

  const fetchServices = async () => {
    try {
      const serviceList = await getServices();
      setServices(serviceList);
    } catch (err) {
      console.error("Error fetching services", err);
    }
  };

  const handleStore = async () => {
    if (!service || !password || !privatekey) return alert("All fields required");
    const key = privatekey+account

    try {
      const cid = await encryptAndUpload(service, password, key);
      await storePasswordOnChain(service, cid);
      alert(`Password stored with CID: ${cid}`);
      setService("");
      setPassword("");
      fetchServices();
    } catch (err) {
      console.error("Error storing password:", err);
      alert("Error storing password. Check console.");
    }
  };

  const handleGetCID = async (service) => {
    try {
      const cid = await getPassword(service);
      setSelectedCID(cid);
    } catch (err) {
      console.error("Error getting password:", err);
    }
  };

  const handleDelete = async (service) => {
    try {
      await deletePassword(service);
      alert(`${service} deleted`);
      fetchServices();
      setSelectedCID(null);
    } catch (err) {
      console.error("Error deleting password:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md mt-6">
      <h1 className="text-3xl font-bold mb-2">🔐 Password Manager</h1>
      <h2 className="text-md text-gray-600 mb-4">Connected Wallet: <span className="text-blue-700">{account}</span></h2>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Service Name"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <input
          type="privatekey"
          placeholder="Your Private Key"
          value={privatekey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleStore}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          💾 Save Password
        </button>
      </div>

      <Services services={services} onView={handleGetCID} onDelete={handleDelete} />

      {selectedCID && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Selected CID:</h4>
          <p className="text-gray-700">{selectedCID}</p>
          <a
            href={`https://${selectedCID}.ipfs.w3s.link`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            🔗 View Encrypted File on IPFS
          </a>
        </div>
      )}

      {account && <Decrypt account={account} />}
    </div>
  );
};

export default App;
