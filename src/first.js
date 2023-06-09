import  {useContext,useEffect } from 'react';
import  {VotingContext}  from './Context/Voter';
import Card from"./Components/Card/Card";
import Style from "./first.module.css";
import Countdown from "react-countdown";

const First =()=> {
    

    const {getNewCandidate, candidateArray,giveVote,checkIfWalletIsConnected,candidateLength,currentAccount,
        voterLength,getAllVoterData}= useContext(VotingContext);
 useEffect(()=>{
          checkIfWalletIsConnected();
          getAllVoterData();
           },[]);


return(
 
  
 <div className={Style.home}>
{currentAccount &&(
    <div className={Style.winner}>
      <div className={Style.winner_info}>
        <div className={Style.candidate_list}>
          <p>
            No Candidate :<span>{candidateLength}</span>
          </p>
        </div>
        <div className={Style.candidate_list}>
          <p>
            No Voter: <span>{voterLength}</span>
          </p>
        </div>
      </div>
      <div className={Style.winner_message}>
        <small>
          <Countdown date={Date.now()+100000000}/>
        </small>
      </div>
    </div>

  )}
   <Card candidateArray={candidateArray} giveVote={giveVote} /> 
  
  </div>
  

  
);
}
export default First;