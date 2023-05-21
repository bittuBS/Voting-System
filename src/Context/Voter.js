import React,{ useState,useEffect,createContext} from 'react';
import Web3Modal from "web3modal";
import {ethers}from "ethers";
import{create as ipfsHttpClient}from "ipfs-http-client";
import axios from "axios";
//import Hello from '../hello';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//import App from '../App';
//import AllowedVoters from '../allowed-voters';

// internal import
import { VotingAddressABI,VotingAddress } from './constants';
const client =ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const fetchContract =(SignerOrProvider)=>{
    new ethers.Contract(VotingAddress,VotingAddressABI,SignerOrProvider);
}
    export const VotingContext = React.createContext();
    
export const VotingProvider =({children})=>{
     const title="hello duniyan kya haal";
     //const router =BrowserRouter();
     

const [currentAccount, setCurrentAccount]=useState('');
const [candidateLength, setCandidateLength] =useState('');
const pushCandidate =[];
const candidateIndex =[];
const [candidateArray, setCandidateArray]=useState(pushCandidate);
//---------------------end of candidate data
const [error, setError]=useState('');
const higestVote =[];

//-----------------voter section
const pushVoter =[];
const [voterArray, setVoterArray]=useState(pushVoter);
const[voterLength, setVoterLength]=useState('');
const [voterAddress, setVoterAddress]=useState([]);


//-----------check connecting wallet
const checkIfWalletIsConnected =async()=>{
    if(!window.ethereum)return setError("please install metamask");
    //it give directly give the account array
    const account =await window.ethereum.request({method: "eth_accounts"});
    if(account.length){
        setCurrentAccount(account[0]);
    }else{
        setError("please install the metamask");

    }

};
//-----------connect wallet
const connectWallet =async()=>{
    if(!window.ethereum)return setError("please install metamask");
    // it try to open the metamask and connect the wallet
    const account =await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(account[0]);

}

//---------upload to the ipfs voter image.

const uploadToIPFS =async(file)=>{

try{
    const added =await client.add({content: file})
const url =`https://ipfs.infura.io/ipfs/${added.path}`;
return url;
}
catch(error){
    setError("error upload to file on ipfs");
}
}
  return (
   <VotingContext.Provider value={{title,checkIfWalletIsConnected,connectWallet,uploadToIPFS }}>
    {children}
   </VotingContext.Provider>
  )
  };
   




