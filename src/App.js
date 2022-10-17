import './App.css';
import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
function App() {
  const [ walletAddress, setWalletAddress] = useState('')
  const [ walletBalance, setWalletBalance] = useState('')
  const [status, setStatus] = useState('Connect Metamask')
  const [isConnected, setIsConnected] = useState(false);
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
    setStatus('Disconnect')
    setIsConnected(true)
})
loading();
}, [walletAddress]) 

function disconnectMetamask() {
  setWalletAddress("");
  setWalletBalance('');
  setIsConnected(false);
  setStatus('Connect Metamask')
}

const loading = () => {
  const container = document.querySelector(".container");
  const textWrapper = document.querySelector(".text-wrapper");
  const text = document.querySelector(".text-wrapper h1");
  const textDimensions = textWrapper.getBoundingClientRect();
  
  let screenLog = document.querySelector("#screen-log");
  
  textWrapper.addEventListener("mousemove", (e) => animateOnMouseOver(e));
  
  function animateOnMouseOver(e) {
    const cursorPositionInsideText = {
      x: e.clientX - Math.round(textDimensions.left),
      y: e.clientY - Math.round(textDimensions.top)
    };
  
    const deg = {
      x: 12 * ((cursorPositionInsideText.x / textDimensions.width) * 2 - 1),
      y: 12 * ((cursorPositionInsideText.y / textDimensions.height) * 2 - 1)
  
    };
  
    text.style.transform = `rotateX(${-deg.y}deg)  rotateY(${deg.x}deg)`;
  }

}
  return (
    <div className="App loading">
      <div className='container'>
        <div class="text-wrapper">
          <h1>
          <div className='content__img'></div>
          </h1>
          
          <div className='connect-button'>
          <div className='title-page'>Connect to a wallet</div>
          {isConnected === false ?
          <div className='meta-button' onClick={() => connectToMetamask()}>
            {status}
          </div>
          : 
          <div className='meta-button' onClick={() => disconnectMetamask()}>
            {status}
          </div>
        }
          <div className='wrap-info'>
            <span className='title'> My address: </span>
            <div className='address'>
                {walletAddress}
            </div>
              <span className='title'> My balance: 
                </span>
            <div className='balance'>
              {walletBalance}
            </div>

          </div>
      </div>
        
      </div>
      </div>    
    </div>
  );
}

export default App;
