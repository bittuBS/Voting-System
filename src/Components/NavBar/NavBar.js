import React,{useState, useContext} from 'react';
import {AiFillLock,AiFillUnlock} from 'react-icons/ai';
//internal import
import { VotingContext } from '../../Context/Voter';
import Style from './NavBar.module.css';
import loading from '../../assets/loding.gif';
import { Link } from 'react-router-dom';

function NavBar() {
    const {connectWallet,error,currentAccount} =useContext(VotingContext);
    const [openNav, setOpenNav]=useState(true);
    const openNavigation =()=>{
        if(openNav){
            setOpenNav(false);
        }
        else{
            setOpenNav(true

            );
        }
    }

  return (
    <div className={Style.navbar}>
    {error === ""? (" "):(
<div className={Style.message__box}>
    <div className={Style.message}>
        <p>{error}</p>
    </div>
</div>
    )}
      <div className={Style.navbar_box}>
        <div className={Style.title}>
            <Link to= '/'>
                <img src={loading} alt='logo' width={80} height={80}/>

            </Link>
        </div>
        <div className={Style.connect}>
            {currentAccount ? (
                <div>
                    <div className={Style.connect_flex}>
                        <button onClick={()=>openNavigation()}>
                            {currentAccount.slice(0,10)}...
                        </button>
                        {currentAccount && (
                            <span >{openNav ? (
                                <AiFillUnlock onClick={()=>openNavigation()}></AiFillUnlock>
                            ):(
                                <AiFillLock onClick={()=>openNavigation()}></AiFillLock>
                            )}</span>
                        )}
                    </div>
{openNav &&(
    <div className={Style.navigation}>
    <p>
        <Link to='/'>Home</Link>
    </p>
    <p>
        <Link to= '/allowed-candidate'>Candidate registration</Link>
    </p>
    <p>
        <Link to= '/allowed-voters'>Voter registration</Link>
    </p>
    <p>
        <Link to= '/voterList'>Voter list</Link>
    </p>

    </div>
)}

                </div>
                
            ):(
                <button onClick={()=>connectWallet()}>Connect Wallet</button>
            )}
        </div>
      </div>
    </div>
    
  )
}

export default NavBar
