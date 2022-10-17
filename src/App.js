import './App.css';
import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
function App() {
  const [ walletAddress, setWalletAddress] = useState('')
  const [ walletBalance, setWalletBalance] = useState('')
  if(window.ethereum){
  } else {
    alert("Please install metamask extension!!")
  }
 
const connectToMetamask = () => {
  window.ethereum.request({method:'eth_requestAccounts'})
  .then(res=>{
    setWalletAddress(res);
  })
}
useEffect(() => {
  window.ethereum.request({
      
    method:'eth_getBalance', 
    params: [`${walletAddress}`, 'latest']
}).then(balance => {
    
    console.log(ethers.utils.formatEther(balance))
    setWalletBalance(ethers.utils.formatEther(balance))
})
}, [walletAddress]) 
  return (
    <div className="App">
      <div className='connect-button'>
        <div className='title-page'>Connect to a wallet</div>
        <div className='meta-button' onClick={() => connectToMetamask()}>
          Connect Metamask
        </div>
        <div className='address'>
           <span className='title'> My address: 
            </span>
          {walletAddress}
        </div>
        <div className='address'>
          
          <span className='title'> My address: 
            </span>
          {walletBalance}
        </div>
      </div>
    </div>
  );
}

export default App;
