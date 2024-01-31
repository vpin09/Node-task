
import { useState } from 'react';
import { ethers } from 'ethers';
import  WalletConnect  from './components/WalletConnect';
import Token from './components/token';
function App() {
  return (
    <div className="App">
     <WalletConnect/>
     <Token/>
    </div>
  );
}

export default App;
