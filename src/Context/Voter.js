import React,{ useState,useEffect,createContext} from 'react';
import FormData from 'form-data';
import Web3Modal from "web3modal";
import {ethers}from "ethers";
import axios from "axios";
import {  Link ,Navigate} from 'react-router-dom';
//import AllowedVoters from '../allowed-voters';
import voting from  './Create.json';
// internal import
//import { VotingAddressABI,VotingAddress} from './Constants';
const VotingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" ;
const VotingAddressABI = voting.abi;

//const client =ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract =(singnerOrProvider)=>
new ethers.Contract(VotingAddress,VotingAddressABI,singnerOrProvider);
    export const VotingContext = React.createContext();
export const VotingProvider =({children})=>{
     const title="hello duniyan kya haal";
     //const router =BrowserRouter();
     //const navigate = useNavigate();
 console.log(VotingAddressABI);

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
const uploadToIPFS= async(file,e)=>{
   
        if(file){
            try{
const formData = new FormData();
formData.append("file",file);
const resFile= await axios({
   method:"post",
   url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
   data: formData,
   headers: {
    pinata_api_key:`1deaf4b3c82fa108fec0`,
    pinata_secret_api_key:`ea6d2df3b3b39b076483a3727124750ae6d9b94fde6eccd531f198f57f3f8c38`,
    "Content-Type":"multipart/form-data",

   } ,
});
console.log(resFile);
 const urls =`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}` ;
 console.log(urls);
 return urls;

}
catch(error){
    console.error("error in upload in ipfs")
}
        }
    }

////////////
// const uploadToIPF =async(file)=>{

// try{
//     const added =await client.add({content: file})
// const url =`https://ipfs.infura.io/ipfs/${added.path}`;
// return url;
// }
// catch(error){
//     setError("error upload to file on ipfs");
// }
// }
//---------upload data of candidate on ipfs
const uploadToIPFSCandidate =async(file)=>{
 try{
//e.preventDefault();
        if(file){     
const formData = new FormData();
formData.append("file",file);
const resFile= await axios({
   method:"post",
   url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
   data: formData,
   headers: {
    pinata_api_key:`1deaf4b3c82fa108fec0`,
    pinata_secret_api_key:`ea6d2df3b3b39b076483a3727124750ae6d9b94fde6eccd531f198f57f3f8c38`,
    "Content-Type":"multipart/form-data",
   } ,
});
//const ImgHash =`ipfs://${resFile.data.IpfsHash}`;
 
 const urls =`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}` ;
 return urls;
}
}
catch(error){
        setError("error upload to file on ipfs");
    }
    }

//---------create voter;
const createVoter =async(formInput,fileUrl,e)=>{
    const {name,address,position}=formInput;
    try{
        console.log(VotingAddressABI);
        
        console.log(name,address,position,fileUrl);
        if(!name || !address || !position)
        return setError("input data is missing");
        //connect smart contract 
        const web3Modal =new Web3Modal();
        const connection = await web3Modal.connect();
        const provider =new ethers.providers.Web3Provider(connection);
        const signer =provider.getSigner();
        const contract =fetchContract(signer);
//console.log("contract address",contract)
//console.log(VotingAddressABI);

const datas = JSON.stringify({name,address,position,image:fileUrl});

e.preventDefault();
const formData = new FormData();
formData.append("file",datas);
const resFile= await axios({
   method:"post",
   url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
   data: formData,
   headers: {
    pinata_api_key:`1deaf4b3c82fa108fec0`,
    pinata_secret_api_key:`ea6d2df3b3b39b076483a3727124750ae6d9b94fde6eccd531f198f57f3f8c38`,
    //"Content-Type":"multipart/form-data",
    'Content-Type': 'application/json', 
   } ,
});
//const ImgHash =`ipfs://${resFile.data.IpfsHash}`;
//console.log(resFile);
 
 const url =`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}` ;

console.log(url);

const voter = await contract.voterRight(address,name,fileUrl,url);
console.log("it is the voter",voter);
voter.await();
//router voteralist side route
 //<Link to="/voterList"></Link> 
//<Redirect to="/voterList"></Redirect>
<Navigate to='/voterList'></Navigate>
//navigate ('/voterList');
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
const setCandidate =async(candidateForm,fileUrl,e)=>{
    const {name,address,age}=candidateForm;
    console.log(name,address,age);
    try{
        
        if(!name || !address || !age)
        return setError("input data is missing");
        //connect smart contract 
const web3modal =new Web3Modal();
const connection =await web3modal.connect();
const provider =new ethers.providers.Web3Provider(connection);
const signer =provider.getSigner();
const contract =fetchContract(signer);
console.log("contract", contract);
const data = JSON.stringify({name,address,age,image:fileUrl});
////////
const formData = new FormData();
formData.append("file",data);
const resFile= await axios({
   method:"post",
   url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
   data: formData,
   headers: {
    pinata_api_key:`1deaf4b3c82fa108fec0`,
    pinata_secret_api_key:`ea6d2df3b3b39b076483a3727124750ae6d9b94fde6eccd531f198f57f3f8c38`,
    'Content-Type': 'application/json', 
   } ,
});
//const ImgHash =`ipfs://${resFile.data.IpfsHash}`;
 
 const ipfs =`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}` ;


// const added = await client.add(data);
// const ipfs =`https://ipfs.infura.io/ipfs/${added.path}`;


console.log("ipfs data",ipfs);
const candidate =await contract.setCandidate(address,age,name,fileUrl,ipfs);
console.log("candidate s",candidate);
candidate.await();
/////router voteralist side route
<Navigate to='/'></Navigate>
//<Link to="/"></Link> 

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
        console.log("get all condidate ",allCandidatedata);
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
