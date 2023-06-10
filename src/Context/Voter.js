import React,{ useState,useEffect,createContext} from 'react';
import Web3Modal from "web3modal";
import {ethers}from "ethers";
import{create as ipfsHttpClient}from "ipfs-http-client";
import axios from "axios";
//import Hello from '../hello';
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
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
//---------upload data of candidate on ipfs
const uploadToIPFSCandidate =async(file)=>{

    try{
        const added =await client.add({content: file})
    const url =`https://ipfs.infura.io/ipfs/${added.path}`;
    return url;
    }
    catch(error){
        setError("error upload to file on ipfs");
    }
    }
//---------create voter;
const createVoter =async(formInput,fileUrl)=>{
    try{
        const {name,address,position}=formInput;
        if(!name || !address || !position)
        return setError("input data is missing");
        //connect smart contract 
const web3modal =new Web3Modal();
const connection =await web3modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
console.log("contract", contract);
const data = JSON.stringify({name,address,position,image:fileUrl});
const added = await client.add(data);
const url =`https://ipfs.infura.io/ipfs/${added.path}`;
console.log(url);
const voter =await contract.voterRight(address,name,url,fileUrl);
voter.await();
//router voteralist side route
 <Link to="/voterList"></Link> 

    }
    catch(error){
        setError("error in creating voter");
    }
};
//------------------get voter data
const getAllVoterData =async()=>{
    try{
    const web3modal =new Web3Modal();
const connection =await web3modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
//voter list
const voterListData = await contract.getVoterList();
setVoterAddress(voterListData);
voterListData.map(async(el)=>{
    const singleVoterData = await contract.getVoterdata(el);
    pushVoter.push(singleVoterData);
});
const voterList = await contract.getVoterLength();
console.log(voterAddress);
setVoterLength(voterList.toNumber());
}

catch(error){
    setError("error in fetching data");
}
}
// useEffect(()=>{
//     getAllVoterData();
// },[]);
//-----------------give vote
const giveVote = async(id)=>{
   
    try{
        
        const voterAddress =id.address;
        const voterId =id.id;
        const web3modal =new Web3Modal();
const connection =await web3modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
const voterList =await  contract.vote(voterAddress,voterId);
console.log(voterList);

    }
    catch(error){
        setError("error in give vote fun");
    }
}

//----------------candidate section
const setCandidate =async(candidateForm,fileUrl)=>{
    try{
        const {name,address,age}=candidateForm;
        if(!name || !address || !age)
        return setError("input data is missing");
        //connect smart contract 
const web3modal =new Web3Modal();
const connection =await web3modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
console.log("contract", contract);
const data = JSON.stringify({name,address,image:fileUrl,age});
const added = await client.add(data);
const ipfs =`https://ipfs.infura.io/ipfs/${added.path}`;
console.log(ipfs);
const candidate =await contract.setCandidate(address,age,name,fileUrl,ipfs);
candidate.await();
//router voteralist side route
 <Link to="/"></Link> 

    }
    catch(error){
        setError("error in creating candidate");
    }
};
//----------------- get candidate data
const getNewCandidate =async()=>{
    try{
        const web3modal =new Web3Modal();
        const connection =await web3modal.connect();
        const provider =new ethers.providers.Web3Provider(connection);
        const signer =provider.getSigner();
        const contract =fetchContract(signer);
        //-----------------all candidate data
        const allCandidatedata = await contract.getCandidate();
        console.log(allCandidatedata);
        allCandidatedata.map(async(el)=>{
            const singleCandidateData = await contract.getCandidatedata(el);
            pushCandidate.push(singleCandidateData);
            candidateIndex.push(singleCandidateData[2].toNumber());

        });
        //----------------candidate length
        const allCandidateLength =await contract.getCandidateLength();
        setCandidateLength(allCandidateLength.toNumber());

    }
    catch(error){
        setError("error in getNewData function ")
    }
}
  return (
   <VotingContext.Provider value={{title,checkIfWalletIsConnected,connectWallet,uploadToIPFS ,createVoter,
   getAllVoterData,giveVote,setCandidate,error,voterArray,voterLength,voterAddress,currentAccount,candidateLength,candidateArray,
   uploadToIPFSCandidate,
   getNewCandidate,error}}>
    {children}
   </VotingContext.Provider>
  )
  };
   




