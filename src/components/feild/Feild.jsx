import { useEffect, useState } from 'react'
import './Feild.css'
import parce from 'react-html-parser'

function Feild({ setMainText, fontSize, focusFun, id, mainText, ...props }) {

    function handleChange(event) {
        event.target.style.height = 5 + 'px';
        event.target.style.height = event.target.scrollHeight + 30 + 'px';
        setMainText(id, event.target.value);
    }

    return (
        <div className='block'>
            <div className="ctn">
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
            </div>
        </div>
    )
}

export default Feild