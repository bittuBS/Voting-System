import React, {useEffect, useContext } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from "./main";
//internal import
import AllowedVoters from './allowed-voters';
import { VotingProvider } from "./Context/Voter"
import Countdown from "react-countdown";
//////// -------internal import
import { VotingContext } from './Context/Voter';
import Style from "./App.css";
import Card from "./Components/Card/Card";
import VoterList from './voterList';
import AllowedCandidate from './candidate-registration';

const App = () => {
  
return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<div>main page</div>}/>
  <Route path="/allowed-voters" element={<AllowedVoters/>}/>
  <Route path="/voterList" element={<VoterList/>}/>
  <Route path="/allowed-candidate" element={<AllowedCandidate/>}/>
</Routes>
  </BrowserRouter>
  </>

  )
};

export default App;
