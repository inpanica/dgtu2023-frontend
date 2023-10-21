import { useEffect, useState } from 'react';
import Button from '../button/Button';
import './CallbackForm.css'
import Input from '../Input/Input.jsx';

function CallbackForm({ buttonText, photoRequired, inputs, ...props }) {

    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordlValue, setPasswordValue] = useState('');

    const valueFuns = {
        'Password' : setPasswordValue,
        'Email' : setEmailValue,
        'Name' : setNameValue
    }

    const values = {
        'Password' : passwordlValue,
        'Email' : emailValue,
        'Name' : nameValue
    }

    const listInputs = Object.keys(inputs).map(i =>
        <Input key={i} 
        type={i === 'Password' ? "password" : "text"} 
        className="callback-form-input" 
        placeholder={inputs[i]}
        required="required"
        changeValueFun={valueFuns[i]}
        inputValue={values[i]}/>
    )

    const [photoFile, setPhotofile] = useState('')

    const changeImg = (event) => {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            setPhotofile(fileReader.result)
        }
        fileReader.readAsDataURL(event.target.files[0]);
    }

    const buttonClick = () =>{
        props.buttonFunction(emailValue, nameValue, passwordlValue);
        setEmailValue('');
        setNameValue('');
        setPasswordValue('');
    }

    return (
        <div className="callback-form">
            {listInputs}
            {
                photoRequired ?
                    <span className="callback-form-image-input" onClick={() => { document.querySelector('#photo-input').click() }}>
                        <img src={photoFile ? photoFile : "./src/images/photoicon.svg"} alt="" className={["photo-icon", photoFile ? 'photo-icon-uploaded' : ''].join(' ')} />
                        <span className="callback-form-image-input-plus">
                            <img src={"./src/images/plus.svg"} alt="" className='callback-form-image-input-plus-image' />
                        </span>
                    </span>
                    :
                    ''
            }
            <Button type={'submit'} onClick={buttonClick}>{buttonText}</Button>
            <input type="file" accept='image/*' id="photo-input" onChange={changeImg} hidden />
        </div>
    )
}

export default CallbackForm