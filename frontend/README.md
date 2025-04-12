# 🔐 Web3 Password Manager

A decentralized password manager built with **React**, **Ethereum (MetaMask)**, **AES encryption**, **IPFS (Web3.Storage)**, and **Smart Contracts** on the **Ethereum blockchain**.

> ✨ Store your passwords securely, privately, and permanently — without trusting a centralized provider.

---

## 📦 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Blockchain**: Ethereum + Solidity Smart Contract
- **Wallet**: MetaMask
- **Storage**: IPFS (via Web3.Storage)
- **Encryption**: AES (CryptoJS) with user-bound key

---

## ✅ Key Features

| Feature | Description |
|--------|-------------|
| 🔒 AES Encryption | Each password is AES-encrypted with a key derived from your Ethereum account. |
| 🔗 Blockchain-Based Indexing | Passwords are mapped to your services and CIDs stored on Ethereum. |
| 🌐 IPFS Storage | Encrypted passwords are stored on IPFS (W3UP) – decentralized and immutable. |
| 🪪 Wallet-based Auth | Login with MetaMask – no username/password headaches. |
| 🧠 Your Data, Your Control | No servers. No tracking. 100% client-side and open-source. |

---

## 🚀 How it Works

1. **You enter** your password and service name (e.g., "Gmail", "Facebook").
2. We **encrypt the password using AES** with a secure key derived from your MetaMask account:
   ```js
   const signed = await ethereum.request({ method: 'personal_sign', params: [msg, account] });
   const key = CryptoJS.SHA256(signed).toString();
