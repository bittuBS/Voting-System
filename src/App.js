import React, { useContext } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//internal import
import AllowedVoters from './allowed-voters';
import { VotingProvider } from "./Context/Voter"
import Countdown from "react-countdown";
//////// -------internal import
import { VotingContext } from './Context/Voter';
import Style from "./App.css";
import Card from "./Components/Card/Card";


const App = () => {
  const {title}= useContext(VotingContext);
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<div>{title}</div>}/>
  <Route path="/allowed-voters" element={<AllowedVoters/>}/>
  

</Routes>
  </BrowserRouter>
  
  
  
  )
}

export default App
