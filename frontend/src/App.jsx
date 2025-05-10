import React, { useEffect, useState } from "react";
import {
  encryptAndUpload,
  storePasswordOnChain,
  getServices,
  getPassword,
  deletePassword,
} from "./utils";
import Services from "./components/Services";

const App = ({ connectWalletProp, account }) => {
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");
  const [services, setServices] = useState([]);
  const [selectedCID, setSelectedCID] = useState(null);
  const [privatekey, setPrivateKey] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (account) {
      fetchServices();
    }
  }, [account]);

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
    if (!account) {
      const newAccount = await connectWalletProp();
      if (!newAccount) return;
    }
    
    const key = privatekey + account;
    setLoading(true); // Start loading


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
    }finally{
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-2 text-gray-800 flex items-center">
        <span className="mr-2">💾</span> Store New Password
      </h1>
      
      <div className="mb-8 space-y-3 mt-6">
        <input
          type="text"
          placeholder="Service Name (e.g. Gmail, Twitter)"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Your Private Key"
          value={privatekey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
  onClick={handleStore}
  className="bg-emerald-500 text-white px-4 py-3 rounded-md hover:bg-green-800 w-full transition duration-200 font-medium shadow-sm flex items-center justify-center relative"
>
  <span className="mr-2 relative flex items-center">
    💾
    {loading && (
      <span className="absolute -top-1 -right-1 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    )}
  </span>
  Save Password
</button>

      </div>

      <Services services={services} onView={handleGetCID} onDelete={handleDelete} />

      {selectedCID && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">Selected CID:</h4>
          <p className="text-gray-700 font-mono text-sm bg-gray-100 p-2 rounded my-2 overflow-auto">{selectedCID}</p>
          <a
            href={`https://${selectedCID}.ipfs.w3s.link`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center mt-2"
          >
            <span className="mr-1">🔗</span> View Encrypted File on IPFS
          </a>
        </div>
      )}
    </div>
  );
};

export default App;