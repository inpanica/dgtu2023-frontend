# React project
## Для решения одной из поставленных задачи(wysiwyg) мы НЕ использовали сторонние библиотеки и написали решение сами
### Поле ввода html разметки и вывода готового текста
```
function Feild({ setMainText, fontSize, focusFun, id, mainText, theme, ...props }) {

    function handleChange(event) {
        event.target.style.height = 5 + 'px';
        event.target.style.height = event.target.scrollHeight + 30 + 'px';
        setMainText(id, event.target.value);
    }

    return (
        <div className={['block', 'block-' + theme].join(' ')}>
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
```
## Кнопки, с помощью которых при выделении текста можно придать выделенной области какие-либо свойства
```
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
                        <Button title='Маркерованный список. Помещает контент в тег <ul></ul>. Чтобы добавить элементы списка, необходимо поместить теги <li></li> между знаками > и <. Пример использования: <ul><li>Элемент списка</li></ul>'onClick={() => { createTag('ul', selectedTextArea) }}>ul</Button>
                        <Button title='Элемент списка. Помещает контент в тег <li></li>. Отображает текст, помещенный между знаками > и < как элемент списка. Чтобы этот тег работал, необходимо поместить его в тег <ul></ul> между знаками > и < Пример использования: <ul><li>Элемент списка</li></ul>' onClick={() => { createTag('li', selectedTextArea) }}>li</Button>
                        <Button title='Ссылка. Помещает контент в тег <a href="ваша ссылка" ></a>. Отображает текст, помещенный между знаками > и < в виде ссылки на указанный вами адрес. Адрес указывается в кавычках в поле href="". Пример использования: <a href="https://адрес">Ссыылка на адрес</a>' onClick={() => { createTag('a', selectedTextArea) }}>C</Button>
                    </div>
                </div>
            </div>
```
## Мы решили отказаться от обычного редактирования текста(то есть сделали не так, как в Word). Наше решение - блочная архитектура. Также На выбор у нас имеется 4 темы.
