import { useEffect, useState } from 'react'
import './Feild.css'
import parce from 'react-html-parser'
import Button from '../button/Button.jsx';

function Feild({ textAreas, setTextAreas, setMainText, fontSize, focusFun, id, mainText, theme, ...props }) {

    const handleChange = (event) => {
        event.target.style.height = 5 + 'px';
        event.target.style.height = event.target.scrollHeight + 30 + 'px';
        setMainText(id, event.target.value);
    }

    const deleteFun = () => {
        setTextAreas(textAreas.filter(area => area.id !== id));
        console.log(id);
    }

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
                <div>
                    <input type="file" accept='image/*' id="user-photo-input" hidden />
                </div>}
            </div>
        </div>
    )
}

export default Feild