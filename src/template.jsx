import { useEffect, useState } from 'react'
import Header from './components/header/Header';
import Button from './components/button/Button';
import './App.css'

function App() {

    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        setDarkTheme(localStorage.getItem('theme') === 'dark');
    }, [])

    return (
        <div className={["wrapper", darkTheme ? 'dark-theme' : 'light-theme'].join(' ')}>
            <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <div className="section">
                <div className="ctn">
                    <h2 className="h2-title">
                        Заголовок
                    </h2>
                    <p className="main-text">
                        Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.  Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная). Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры
                    </p>
                    <Button onClick={() => {console.log('fkejfeaj');}}>Ауау</Button>
                    <Button onClick={() => {console.log('fkejfeaj');}}>{'))'}</Button>
                </div>
            </div>
            <div className="section">
                <div className="block">
                    <div className="ctn">
                        <p className="main-text">
                            Текст (от лат. textus — ткань; сплетение, сочетание) — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.  Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная). Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App