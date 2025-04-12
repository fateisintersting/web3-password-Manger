import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function Decrypt({ account }) {
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const [privatekey, setPrivateKey] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const handleDecryption = () => {
    if (!encryptedPassword || !privatekey) {
      return alert("Please enter both encrypted password and private key");
    }
    
    if (!account) {
      return alert("Please connect your wallet first");
    }
    
    setIsDecrypting(true);
    
    try {
      const decryptionKey = privatekey + account;
      const key = CryptoJS.SHA256(decryptionKey).toString();
      const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error("Decryption failed");
      }
      
      setDecryptedPassword(decrypted);
      setEncryptedPassword('');
    } catch (error) {
      alert("Decryption failed. Please check your inputs.");
      console.error("Decryption error:", error);
    } finally {
      setIsDecrypting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <span className="mr-2">🔓</span> Decrypt Password
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="privatekey" className="block text-sm font-medium text-gray-700 mb-1">
              Private Key
            </label>
            <input
              id="privatekey"
              type="password"
              placeholder="Enter your private key"
              value={privatekey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="encryptedPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Encrypted Password
            </label>
            <textarea
              id="encryptedPassword"
              placeholder="Enter encrypted password"
              value={encryptedPassword}
              onChange={(e) => setEncryptedPassword(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24"
            />
          </div>
          
          <button 
            onClick={handleDecryption}
            disabled={isDecrypting}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition duration-200 font-medium shadow-sm w-full flex items-center justify-center"
          >
            {isDecrypting ? "Decrypting..." : "Decrypt Password"}
          </button>
          
          {decryptedPassword && (
            <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
              <h3 className="text-sm font-medium text-green-800 mb-2">Decrypted Password:</h3>
              <div className="bg-white p-3 rounded border border-green-200 font-mono text-sm break-all">
                {decryptedPassword}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-2">How to use:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Enter your private key (the same key used when encrypting)</li>
          <li>Paste the encrypted password text</li>
          <li>Click the "Decrypt Password" button</li>
          <li>Your decrypted password will appear below</li>
        </ol>
        <div className="mt-4 text-sm text-gray-500">
          Note: Decryption happens locally in your browser. Your private key and passwords are never sent to any server.
        </div>
      </div>
    </div>
  );
}