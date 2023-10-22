import '../../App.css'
import Feild from '../feild/Feild.jsx'
import Button from '../button/Button.jsx'
import './mainPage.css'
import { sendDocs, getAllArticles, sendPhotos, getPhotos } from '../actions'
import { useEffect, useState } from 'react'
import JSZip from 'jszip'
import cyrillicToTranslit from 'cyrillic-to-translit-js'

function MainPage({ setAllArticles, user, ...props }) {

    const [textAreas, setTextAreas] = useState([{ 'id': 'feild' + 1, 'text': 'Заголовок', 'fontSize': 'title' }]);
    const [selectedTextArea, setSelectedTextArea] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState('sky');
    const [sendButtonEnabled, setSendButtonEnabled] = useState(false)

    const fontSizes = {
        'title': 'заголовок',
        'subtitle': 'подзаголовок',
        'main': 'текст'
    }

    const themes = ['sky', 'sea', 'flowers', 'fire']

    useEffect(() => {
        const deleteEmptys = textAreas.map(area => {
            if (area.text !== '') {
                return area
            }
        })
        if (textAreas.length > 1 && deleteEmptys.length === textAreas.length) {
            setSendButtonEnabled(true)
        }
        else {
            setSendButtonEnabled(false)
        }
    }, [textAreas])

    const createArchive = async (photoFiles) => {
        const zip = new JSZip();
        photoFiles.forEach((photo) => {
            zip.file(photo.name, photo.file);
        });
        const content = await zip.generateAsync({ type: 'blob' });
        return content;
    };

    const sendArticle = async () => {
        const date = new Date();
        const data = new Intl.DateTimeFormat('en-US').format(date.now);
        const sendTitle = textAreas[0].text;
        let files = [];
        const fileReaders = [];

        const sendText = await Promise.all(
            textAreas.map(async (area) => {
                if (area.fontSize !== 'img') {
                    return area.fontSize === 'title' ? '' : `<${area.fontSize}>` + area.text + `</${area.fontSize}>`;
                } else {
                    const fileReader = new FileReader();
                    const filePromise = new Promise((resolve) => {
                        fileReader.onload = () => {
                            resolve(fileReader.result);
                        };
                    });
                    fileReader.readAsDataURL(document.getElementById(area['id']).files[0]);
                    fileReaders.push({ 'filePromise': filePromise, name: area.text });
                    return `<img src="${area.text}"/>`;
                }
            })
        );

        await Promise.all(fileReaders);

        // fileReaders.forEach((result) => {

        //     files.push({ name: textAreas[index], file: result });
        // });
        fileReaders.map((f) => {
            files.push({ name: f.name, file: f.result });
        })

        const archive = await createArchive(files)
        const doc = { 'title': sendTitle, 'description': sendText.join(' '), 'user_name': user.name, 'date': data.replaceAll('/', '.'), 'theme': selectedTheme, 'file_name': '' };
        const r = await (sendDocs(doc));
        let photoStatus = rPhoto.status
        if (files) {
            const rPhoto = await (sendPhotos(archive));
            console.log(rPhoto);
            photoStatus = rPhoto.status
        }
        else {
            photoStatus = 200;
        }
        if (r.status === 200 && photoStatus === 200) {
            const r2 = await getAllArticles()
            setAllArticles(r2.data.data)
            const rPhoto2 = await getPhotos(r.config.data.title);
            const link = "/articles/" + (cyrillicToTranslit().transform((sendTitle), "_")).replaceAll('/', '').replaceAll('<', '').replaceAll('>', '') + data.replaceAll('.', '-').replaceAll('/', '-');
            window.location.assign(link);
        }
    };

    const handleBlur = (id) => {
        setSelectedTextArea(id);
    }

    const createTextArea = (fontSize) => {
        setTextAreas([...textAreas,
        {
            id: 'feild' + ((textAreas.length) + 1),
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

    const createImg = () => {
        createTextArea('img');
    }

    const createTag = (tag, id) => {
        let result = ''
        if (tag === 'a') {
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
                        <Button title='Курсив. Помещает контент в тег <i></i>. Отображает текст, помещенный между знаками > и < курсивом. Пример использования: <i>Строка</i>' onClick={() => { createTag('i', selectedTextArea) }}><i>К</i></Button>
                        <Button title='Жирный. Помещает контент в тег <b></b>. Отображает текст, помещенный между знаками > и < жирным шрифтом. Пример использования: <b>Строка</b>' onClick={() => { createTag('b', selectedTextArea) }}><b>Ж</b></Button>
                        <Button title='Подчёркнутый. Помещает контент в тег <u></u>. Отображает текст, помещенный между тображает знаками > и < подчёеркнутым шрифтом. Пример использования: <u>Строка</u>' onClick={() => { createTag('u', selectedTextArea) }}><u>П</u></Button>
                        <Button title='Маркерованный список. Помещает контент в тег <ul></ul>. Чтобы добавить элементы списка, необходимо поместить теги <li></li> между знаками > и <. Пример использования: <ul><li>Элемент списка</li></ul>' onClick={() => { createTag('ul', selectedTextArea) }}>ul</Button>
                        <Button title='Элемент списка. Помещает контент в тег <li></li>. Отображает текст, помещенный между знаками > и < как элемент списка. Чтобы этот тег работал, необходимо поместить его в тег <ul></ul> между знаками > и < Пример использования: <ul><li>Элемент списка</li></ul>' onClick={() => { createTag('li', selectedTextArea) }}>li</Button>
                        <Button title='Ссылка. Помещает контент в тег <a href="ваша ссылка" ></a>. Отображает текст, помещенный между знаками > и < в виде ссылки на указанный вами адрес. Адрес указывается в кавычках в поле href="". Пример использования: <a href="https://адрес">Ссыылка на адрес</a>' onClick={() => { createTag('a', selectedTextArea) }}>C</Button>
                    </div>
                </div>
            </div>
            <div className="article-zone">
                <div className="ctn">
                    <div className="theme-choose-buttons-wrapper">
                        {themes.map(theme => {
                            return <div onClick={() => { setSelectedTheme(theme) }} className={["theme-choose-button",
                                selectedTheme === theme ? "theme-choose-button-active" : '',
                                'theme-choose-button-' + theme].join(' ')}></div>
                        })}
                    </div>
                </div>
                {textAreas.map((i) =>
                    <Feild
                        textAreas={textAreas}
                        setTextAreas={setTextAreas}
                        theme={selectedTheme}
                        key={i.id}
                        id={i.id}
                        mainText={i.text}
                        setMainText={setMainText}
                        focusFun={() => { handleBlur(i.id) }}
                        fontSize={i.fontSize}
                        placeholder={'Введите ' + fontSizes[i.fontSize]}></Feild>
                )}
                <div className="ctn send-button-wrapper">
                    {sendButtonEnabled ? <Button onClick={() => { sendArticle() }}>Отправить</Button> : ''}
                </div>
            </div>
            <div className="append-panel">
                <div className="append-panel-block">
                    <div className="ctn append-panel-content">
                        <Button onClick={() => { createTextArea('subtitle') }}>Добавить подзаголовок</Button>
                        <Button onClick={() => { createTextArea('main') }}>Добавить текст</Button>
                        <Button onClick={() => { createImg() }}>Добавить изображение</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage