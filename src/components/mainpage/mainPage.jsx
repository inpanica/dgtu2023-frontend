import '../../App.css'
import Feild from '../feild/Feild.jsx'
import Button from '../button/Button.jsx'
import './mainPage.css'
import { useEffect, useState } from 'react'

function MainPage() {

    const [textAreas, setTextAreas] = useState([{ 'id': 'feild' + 1, 'text': 'Заголовок', 'fontSize': 'title' }]);
    const [selectedTextArea, setSelectedTextArea] = useState(null);
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')

    const fontSizes = {
        'title': 'заголовок',
        'subtitle': 'подзаголовок',
        'main': 'текст'
    }

    useEffect(() => {
        setTitle(textAreas[0].text);
        console.log(title);
    }, [textAreas[0]])

    const handleBlur = (id) => {
        setSelectedTextArea(id);
    }

    const createTextArea = (fontSize) => {
        setTextAreas([...textAreas,
        {
            id: Number(textAreas[textAreas.length - 1].id[textAreas[textAreas.length - 1].id.length - 1]) + 1 + 'feild',
            'text': '',
            'fontSize': fontSize
        }])
    }

    const setMainText = (id, text) => {
        setTextAreas(textAreas.map(obj => {
            if (obj.id === id) {
                return { ...obj, ['text']: text };
            } else {
                return obj;
            }
        }));
    }

    const createTag = (tag, id) => {
        let result = ''
        if(tag === 'a'){
            result = prompt('Введите ссылку', '');
            result = ' href="' + result + '"'
        }
        const control = document.getElementById(id);
        const start = control.selectionStart;
        const end = control.selectionEnd;

        if (start !== end) {
            var text = control.value
            setTextAreas(textAreas.map(obj => {
                if (obj.id === id) {
                    return { ...obj, ['text']: text.substring(0, start) + `<${tag}${result || ''}>` + text.substring(start, end) + `</${tag}>` + text.substring(end) };
                } else {
                    return obj;
                }
            }));
        }
        control.focus();
        var sel = end + 7;
        control.setSelectionRange(sel, sel);
    }

    return (
        <>
            <div className="font-panel">
                <div className="append-panel-block font-panel-block">
                    <div className="ctn font-panel-content">
                        <Button onClick={() => { createTag('i', selectedTextArea) }}><i>К</i></Button>
                        <Button onClick={() => { createTag('b', selectedTextArea) }}><b>Ж</b></Button>
                        <Button onClick={() => { createTag('u', selectedTextArea) }}><u>П</u></Button>
                        <Button onClick={() => { createTag('strike', selectedTextArea) }}><strike>О</strike></Button>
                        <Button onClick={() => { createTag('a', selectedTextArea) }}><p>C</p></Button>
                    </div>
                </div>
            </div>
            <div className="article-zone">
                {textAreas.map((i) =>
                    <Feild key={i.id} id={i.id} mainText={i.text} setMainText={setMainText} focusFun={() => { handleBlur(i.id) }} fontSize={i.fontSize} placeholder={'Введите ' + fontSizes[i.fontSize]}></Feild>
                )}
            </div>
            <div className="append-panel">
                <div className="append-panel-block">
                    <div className="ctn append-panel-content">
                        <Button onClick={() => { createTextArea('subtitle') }}>Добавить подзаголовок</Button>
                        <Button onClick={() => { createTextArea('main') }}>Добавить текст</Button>
                        <Button>Добавить изображение</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage