import { useEffect, useState } from 'react';
import './Input.css'

function Input({...props}) {

    const changeHandle = (e) => {
        props.changeValueFun(e.target.value)
    }

    return (
        <input type={props.type} className="callback-form-input" placeholder={props.placeholder} 
        required="required" 
        value={props.inputValue}
        onChange={changeHandle}/>
    )
}

export default Input