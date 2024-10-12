import React, { useEffect, useState } from 'react'
import contractABI from '../contract/abi.json'
import { ethers } from 'ethers';

const GetUserContract = () => {
    const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [people, setPeople] = useState([]);
  const contractAddress = "0x557d04a7E393018A23451e7032Ad11ae5DE3b458";

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
          
          const Contacts = await loadedContract.retrieve()
          setPeople(Contacts)
      } catch (error) {
        console.error("Error loading provider or contract:", error);
      }
    };

    loadContract();
  }, [contractAddress]);
  return (
      <div className='w-[50rem] h-[20rem] shadow-xl rounded-lg mt-5'>
          <div className=' flex flex-col px-4 gap-4'>
        <table>
          <thead>
            <tr className='text-[#FFE500]'>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Quote</td>
              </tr>
          </thead>
        {people.map((person, index) => (
          <tbody key={index}>
            <tr className='text-[#FFE500]'>
              <td>{person.fullName}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{ person.quote}</td>
              
            </tr>
          </tbody>
        ))}
      </table>
          </div>
    </div>
  )
}

export default GetUserContract