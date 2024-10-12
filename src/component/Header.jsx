import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null);

    const connectWallet = async() => {
        try {
            if (!window.ethereum) {
                alert('please install metamask');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()

            const accounts = (await signer).address; 
            console.log(signer)
            setAccount(accounts)
            setProvider(provider);
            setIsConnected(true);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    }

const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setIsConnected(false);
    };


    
    useEffect(() => {
    // Check if already connected on component mount
    const checkConnection = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await web3Provider.getSigner();
        if (accounts.length > 0) {
          setAccount(accounts);
          setProvider(web3Provider);
          setIsConnected(true);
        }
      }
    };

    checkConnection();
  }, []);

  return (
      <div className='flex flex-col items-center justify-center px-4 gap-4'>
      <input type='text' className='border-2 border-[#FFE500] text-[#FFE500] py-2 px-2 bg-transparent w-[30rem]' value={account} readOnly/>
      
          {
              isConnected ?
                  <div  className='flex gap-4  items-center'>
                      <div onClick={disconnectWallet} className='bg-[#E92619] text-[#fff] cursor-pointer px-3 py-2 rounded-lg'>Connected Wallet</div>
                 </div>
                  :
                <div onClick={connectWallet} className='bg-[#FFE500] text-[#000000] cursor-pointer px-3 py-2 rounded-lg'>Connect Wallet</div>

 
          }
    </div>
  )
}

export default Header