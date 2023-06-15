import React from 'react'
import Style from './Card.module.css';
import images from '../../assets'

const Card = ({candidateArray, giveVote}) => {
  return (
    <div className={Style.card}>
    {candidateArray.map((el,i)=>(
        <div className={Style.card_box} key={i}>
            <div className={Style.image}>
                <img src={el[3]} alt="image profile"></img>
            </div>
            <div className={Style.card_info}>
                <h2>
                    {el[1]}# {el[2].toNumber()}
                </h2>
                <p>{el[0]}</p>
                <p>Address:{el[6].slice(0,30)}...</p>
                <p className={Style.total}>Total vote</p>
            </div>
            <div className={Style.card_vote}>
                <p>{el[4].toNumber()}</p>
            </div>
            <div className={Style.card_button}>
                <button onClick={()=>giveVote({id: el[2].toNumber(), address: el[6]})}>Give Vote</button>
            </div>
        </div>
    ))}
      
    </div>
  )
}

export default Card

