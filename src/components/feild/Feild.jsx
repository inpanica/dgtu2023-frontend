import { useEffect, useState } from 'react'
import './Feild.css'
import parce from 'react-html-parser'
import Button from '../button/Button.jsx';

function Feild({ textAreas, setTextAreas, setMainText, fontSize, focusFun, id, mainText, theme, ...props }) {

    const [photoFile, setPhotoFile] = useState();

    const handleChange = (event) => {
        event.target.style.height = 5 + 'px';
        event.target.style.height = event.target.scrollHeight + 30 + 'px';
        setMainText(id, event.target.value);
    }

    const deleteFun = () => {
        setTextAreas(textAreas.filter(area => area.id !== id));
        console.log(id);
    }

    const uploadImg = (event) => {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            setPhotoFile(fileReader.result)
        }
        fileReader.readAsDataURL(event.target.files[0]);
        setMainText(id, './src/' + (event.target.files[0].name));
    }

    useEffect(() => {
        if (fontSize === 'img') {
            document.getElementById(id).click()
        }
    }, [])

    return (
        <div className={['block', 'block-' + theme].join(' ')}>
            <div className="ctn, block-feild">
                {fontSize !== 'title' ? <Button onClick={() => { deleteFun() }} className='delete-button'>Удалить</Button> : ''}
                {fontSize !== 'img' ? <>
                    <textarea placeholder={props.placeholder}
                        spellcheck="false"
                        id={id}
                        onBlur={focusFun}
                        style={{ 'height': '110px' }}
                        value={mainText}
                        onChange={(event) => { handleChange(event) }}
                        className={['making-article-input', 'making-article-input-' + fontSize].join(' ')}></textarea>
                    <div
                        className={['result-feild making-article-input', 'making-article-input-' + fontSize].join(' ')}>
                        {mainText !== '' ? parce(mainText) : 'Результат будет отображаться здесь'}</div>
                </> :
                    <div className='feild-img-wrapper'>
                        <input type="file" accept='image/*' id={id} hidden onChange={uploadImg} />
                        <img src={photoFile} alt="" className='feild-img'/>
                    </div>}
            </div>
        </div>
    )
}

export default Feild