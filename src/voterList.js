import React,{useState,useEffect,useContext} from 'react'
//internal import
import VoterCard from './Components/VoterCard/VoterCard'
import Style from './voterList.module.css';
import {VotingContext}from './Context/Voter';
import NavBar from './Components/NavBar/NavBar';
const VoterList = () => {
  const {getAllVoterData, voterArray} =useContext(VotingContext);
  useEffect (()=>{
    getAllVoterData();
  })
  return (
    <>
    <NavBar/>
    <div className={Style.voterList}>
    <VoterCard voterArray={voterArray}/> 
    </div>
    </>
  )
}

export default VoterList
