import React, { useEffect, useState } from 'react'
import contractABI from '../contract/abi.json'
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
const AddUserContact = () => {
    const [contract, setContract] = useState(null);
  const contractAddress = "0x557d04a7E393018A23451e7032Ad11ae5DE3b458";
  console.log('this is', contractAddress)
  const [account, setAccount] = useState(null);

    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
  const [quote, setQuote] = useState("")
  
 useEffect(() => {
    const loadContract = async () => {
      try {
        if (!contractAddress || !ethers.isAddress(contractAddress)) {
          throw new Error("Invalid contract address");
        }

        const provider = new ethers.BrowserProvider(window.ethereum); // Ensure you're using v6+
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner(); // Use await here
        const loadedContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
        
        // Get the connected account
        const account = await signer.getAddress();
        setAccount(account);
        
        setContract(loadedContract);
      } catch (error) {
        console.error("Error loading provider or contract:", error);
      }
    };

    loadContract();
  }, [contractAddress]);
  
  const submitContact = async () => {
    try {
      if (!contract) {
        throw new Error("Contract not loaded");
      }

      // Call the contract method to add a person
      const tx = await contract.addPerson(fullname, phone, email, quote);
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Person added successfully:', tx);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  }
  return (
      <div className='flex flex-col px-4 gap-4'>
              <p hidden>Connected account: {account}</p>

        <input
          className='text-[#FFE500] bg-transparent border-b-2 border-[#FFE500] py-2 px-2 rounded-lg'
          name="fullname"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          type='text'
          placeholder='fullname' />
        
        <input
          className='text-[#FFE500] bg-transparent border-b-2 border-[#FFE500] py-2 px-2 rounded-lg'
          name='phone'
          onChange={(e)=>setPhone(e.target.value)}
          value={phone} type='text' placeholder='phone number' />
        <input
          className='text-[#FFE500] bg-transparent border-b-2 border-[#FFE500] py-2 px-2 rounded-lg'
          name='email'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          type='text' placeholder='email' />
        <textarea className='text-[#FFE500] bg-transparent border-b-2 border-[#FFE500] py-2 px-2 rounded-lg'
          name="quote"
          onChange={(e)=>setQuote(e.target.value)}
          value={quote} id="" cols="10" rows="2"></textarea>
        
        <button onClick={submitContact} className='bg-[#FFE500] text-[#000] py-2 cursor-pointer'>Submit Contact</button>
        <Link to='/list' className='bg-[#FFE500] text-center text-[#000] py-2 cursor-pointer'>View Contact</Link>
      </div>

  )
}

export default AddUserContact