import React from 'react'
import {useEffect,useState,useContext,useCallback} from 'react';
import{useDropzone} from "react-dropzone";
import NavBar from './Components/NavBar/NavBar';
/// ----internal import
import { VotingContext } from './Context/Voter';
import Style from "./allowedVoter.module.css";
import images from "./assets";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";

const AllowedVoters = () => {
const [fileUrl, setFileUrl]=useState(null);
const [formInput, setFormInput]=useState({
  name:"",
  address:"",
  position:""
});
//router

const {uploadToIPFS,createVoter,voterArray,getAllVoterData}=useContext(VotingContext);
//--------voters image drop
const onDrop =useCallback(async(accFil)=>{
  const url =await uploadToIPFS(accFil[0]);
  setFileUrl(url);
});
const {getRootProps, getInputProps}=useDropzone({
  onDrop,
  accept: "image/*",
  maxSize : 5000000,
});
console.log(fileUrl);
useEffect(()=>{
  getAllVoterData();
},[]);
//------jsx part

  return (
    <>
    <NavBar/> 
    <div className={Style.createVoter} >
    <div>{fileUrl && (
      <div className={Style.voterInfo}>
    <img src={fileUrl} alt='voter image'></img>
    <div className={Style.voterInfo_paragraph}>
      <p> Name: <span>&nbs;{formInput.name}</span> </p>
      <p> Add: <span>&nbs;{formInput.address.slice(0,20)}</span> </p>
      <p> Pos: <span>&nbs;{formInput.position}</span> </p>
    </div>
      </div>
    )}
     {!fileUrl &&(
      <div className={Style.sideInfo}>
        <div className={Style.sideInfo_box}>
          <h4>create candidate for voting</h4>
          <p>Blockchain voting organization , provide ethereum ecosystem</p>
          <p className={Style.sideInfo_para}>Contract Candidate List</p>
        </div>
        <div className={Style.card}>
           {voterArray.map((el,i)=>(
            <div key={i+1} className={Style.card_box}>
              <div className={Style.image}>
              <img src={el[4]} alt='profile photo'></img>
            </div>
            <div className={Style.card_info}>
            <p>Name:{el[1]}</p>
            <p>Address:{el[3].slice(0,10)}...</p>
            {/* <p>Details</p> */}
            </div>
            </div>
          ))} 
        </div>
      </div>
    )} 
    </div>
<div className={Style.voter}>
      <div className={Style.voter__container}>
        <h1>Create New Voter</h1>
        <div className={Style.voter__container__box}>
          <div className={Style.voter__container__box__div}>
          
            <div {...getRootProps()}>
              <input {...getInputProps()}/>
              
              <div className={Style.voter__container__box__div__info}>
              <p> Upload file: JPG,PNG,GIF,WEBM max 10MB </p>
              <div className={Style.voter__container__box__div__image}>
              <img 
              src={images.upload} alt='file upload' width={150} height={150} objectfit="contain"/>
              </div>
              <p>Drag & Drop file</p>
              <p>or Browse Media on you device</p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.input__container}>
      <Input  inputType="text" title="Name" placeholder=" Voter Name" handleClick={(e)=>setFormInput({...formInput,name:e.target.value})}/>
      <Input  inputType="text" title="Address" placeholder=" Voter Address" handleClick={(e)=>setFormInput({...formInput,address:e.target.value})}/>
        <Input  inputType="text" title="Position" placeholder=" Voter Position" handleClick={(e)=>setFormInput({...formInput,position:e.target.value})}/>
<div className={Style.Button}>
  <Button btnName="Authorized voter" handleClick={()=>createVoter(formInput,fileUrl)}/>
</div>
      </div>
    </div>

<div className={Style.createdVoter}>
  <div className={Style.createdVoter__info}>
    <img src={images.creator} alt="user profile"></img>
    <p>Notice For User</p>
    <p>Organizer <span>0x4245245645</span></p>
    <p>only Organizer of the voting contract can create the voter for voting election</p>
  </div>
</div>

      </div>
</>
  );
        };


export default AllowedVoters;