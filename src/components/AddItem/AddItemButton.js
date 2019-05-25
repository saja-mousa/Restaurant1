import React from 'react'
import './AddItem.css'

const AddItemButton=(props)=>{

    if (props.userNameISValid && props.passwordISValid) {

        return (
             <button onClick={props.Click} className="login-button" > </button>
        )
       
       
    } else {
        return (
            <div>
            <p id="msg"> please enter your<br/> name and password </p> <br/>
            <button  className="lock-login" > </button>
            </div>
        )
    }

}


export default AddItemButton;