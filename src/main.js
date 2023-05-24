import { useContext,useEffect } from 'react';
import { VotingContext } from './Context/Voter';
import Card from"./Components/Card/Card";
import Style from "./App.css";
import Countdown from "react-countdown";

const Main = () => {
    useEffect(()=>{
        //checkIfWalletIsConnected();
          });

    const {getNewCandidate, candidateArray,giveVote,checkIfWalletIsConnected,candidateLength,currentAccount,
        voterLength}= useContext(VotingContext);
    
return(
<div className={Style.home}>{currentAccount &&(
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
          <Countdown date={Date.now()+100000}/>
        </small>
      </div>
    </div>

  )}
  <Card candidateArray={candidateArray} giveVote={giveVote} />
  </div>
 
);
}
export default Main;