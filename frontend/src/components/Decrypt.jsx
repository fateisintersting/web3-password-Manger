import React from 'react';
import CryptoJS from 'crypto-js';

export default function Decrypt({account}) {

   
    // const { account } = props; // Destructure account from props
    const [encryptedPassword, setEncryptedPassword] = React.useState('');
    const [decryptedPassword, setDecryptedPassword] = React.useState('');
    const [privatekey, setPrivateKey] = React.useState('');

    const handledecryption = () =>{
        const decyptionkey = privatekey+account;
        
        if (!account) return alert("Please connect your wallet first");
        const key = CryptoJS.SHA256(decyptionkey).toString();
        const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key).toString(CryptoJS.enc.Utf8);
        setDecryptedPassword(decrypted);
        setEncryptedPassword('')

    }
  return (
    <div>
      <div className='flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4'> 
        <h2 className="text-2xl bold ">Decrypt</h2>
        

        <input
          type="test"
          placeholder="private key"
          value={privatekey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          value={encryptedPassword}
          onChange={(e) => setEncryptedPassword(e.target.value)}
        />
        <button className='bg-amber-500' onClick={handledecryption}>Decrypt</button>
        <p>Decrypted Password: {decryptedPassword} </p>
      </div>
    </div>
  );
}
