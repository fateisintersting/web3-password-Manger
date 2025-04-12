import * as W3upClient from '@web3-storage/w3up-client';
import CryptoJS from 'crypto-js';
import { ethers } from 'ethers';
import abi from './abi/PasswordManager.json';

const CONTRACT_ADDRESS = '0x057614cb11989Ef9d2071a1E2bC478aF4c111009';
const email = import.meta.env.VITE_W3_EMAIL;
const spaceDid = import.meta.env.VITE_WEB3_STORAGE_TOKEN;

// === Get Contract Instance ===
export async function getContract() {
  if (!window.ethereum) throw new Error('MetaMask not found');
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}

// === Encrypt and Upload ===
export async function encryptAndUpload(service, password, privatekey) {
  const key = CryptoJS.SHA256(privatekey).toString();
  const encrypted = CryptoJS.AES.encrypt(password, key).toString();

  const blob = new Blob([encrypted], { type: 'text/plain' });
  const file = new File([blob], `${service}.txt`, { type: 'text/plain' });

  const client = await W3upClient.create();
  const accounts = await client.accounts();

  if (!Object.keys(accounts).length) {
    await client.login(email);
  }

  await client.setCurrentSpace(spaceDid);

  const cid = await client.uploadFile(file, {
    name: `${service}.txt`,
  });

  return cid.toString();
}


// === Store CID on Blockchain ===
export async function storePasswordOnChain(service, cid) {
  if (!window.ethereum) throw new Error('MetaMask not found');
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();
  const balance = await provider.getBalance(walletAddress);
  const balanceInEth = ethers.formatEther(balance);
  console.log("Balance in ETH:", balanceInEth);
  const contract = await getContract();
  if (contract){
    console.log("Contract instance:", contract);
  }
  const tx = await contract.storePassword(service, cid);
  await tx.wait();


}

// === Fetch All Services ===
export async function getServices() {
  const contract = await getContract();
  return await contract.getServicesList(); // ✅ Match your Solidity function name
}

// === Get CID by Service ===
export async function getPassword(service) {
  const contract = await getContract();
  return await contract.getPassword(service);
}

// === Delete Password ===
export async function deletePassword(service) {
  const contract = await getContract();
  const tx = await contract.deletePassword(service);
  await tx.wait();
}
