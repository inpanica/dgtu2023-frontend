import './UserPage.css';
import { useState } from 'react';
import Button from '../button/Button.jsx';

function UserPage({user, ...props}) {

    const [photoFile, setPhotoFile] = useState('./src/images/photo_2023-10-09_20-18-29.jpg')
    const [newPhotoFile, setNewPhotoFile] = useState(photoFile)
    const [changingName, setChangingName] = useState(false)
    const [name, setName] = useState('Username')
    const [newName, setNewName] = useState(name)

    const changeImg = (event) => {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            setNewPhotoFile(fileReader.result)
        }
        fileReader.readAsDataURL(event.target.files[0]);
    }

    useState(() => {
        setName(user.name)
        setNewName(user.name)
    }, [user])

    return (
        <div className="">
            <div className="block">
                <div className="ctn">
                    <div className="user-info">
                        {/* <span className="image-input" onClick={() => { document.querySelector('#user-photo-input').click() }}>
                            <img src={newPhotoFile} alt="" className="user-photo" />
                            <span className="image-input-plus">
                                <img src={"./src/images/plus.svg"} alt="" className='image-input-plus-image' />
                            </span>
                            <input type="file" accept='image/*' id="user-photo-input" onChange={changeImg} hidden />
                        </span> */}
                        <div className="user-info-text-part">
                            {
                                changingName ?
                                    <input type='text' className='h2-title username-field-input' value={newName} onChange={(event) => setNewName(event.target.value)}>
                                    </input> :
                                    <h2 className="h2-title username-field" onClick={() => { setChangingName(true) }}>{newName}</h2>
                            }
                            <p className="main-text">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ctn">
                {(newName !== name || newPhotoFile !== photoFile) ?
                    <Button type={'submit'} onClick={() => { console.log('fdsf') }}>{'Подвердить изменения'}</Button> :
                    ''}
            </div>
        </div>
    )
}

export default UserPage