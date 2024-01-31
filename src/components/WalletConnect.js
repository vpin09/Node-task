
// import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  async function requestAccount() {
    console.log('Requesting account...');
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
       const token18= new ethers.BigNumber(await getWallBal());
       const tokenamount=token18.div(10*18)
       setBalance(tokenamount);

      } catch (error) {
        console.log('Error connecting...',error);
      }

    } else {
      alert('Meta Mask not detected');
    }
  }
  async function getWallBal(){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/balance/0xdDB76ae585Fe95a023ad1c5dC3192654D882b7D7/${walletAddress}`,
      headers: { }
    };
    axios.request(config).then((response) => {
       return response.data.balance
    }).catch((error) => {console.log(error);
    });

  }
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
     

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
        
        onClick={requestAccount}
        
        >Request Account</button>
        <h3>Wallet Address: {balance}</h3>
      </header>
    </div>
  );
}

export default WalletConnect;