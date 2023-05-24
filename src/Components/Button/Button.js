import Style from"./Button.module.css";

import React from "react";
const Button=({btnName,handleClick,classStyle})=>(
   
        <button className={Style.button} type="button" onClick={handleClick}>
                {btnName}
        </button>

        
    
);
export default Button;