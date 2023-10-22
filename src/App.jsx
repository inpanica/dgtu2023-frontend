import { useEffect, useState } from 'react'
import Header from './components/header/Header';
import Registration from './components/registration/Registration.jsx';
import Authorization from './components/authorization/Authorization.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './components/userpage/UserPage.jsx';
import Article from './components/article/Article.jsx';
import './App.css'
import MainPage from './components/mainpage/mainPage.jsx';
import { getUser, getAllArticles } from './components/actions';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Link } from 'react-router-dom';

function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [user, setUser] = useState({ 'email': '', 'name': '' })
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        setDarkTheme(localStorage.getItem('theme') === 'dark');
        const User = async () => {
            if (localStorage.getItem('access')) {
                const r = await getUser()
                setUser({ 'email': r.data.email, 'name': r.data.name })
            }
        }
        const getArticles = async () => {
            const r2 = await getAllArticles();
            if (r2.status === 200) {
                setAllArticles(r2.data.data)
            }
        }
        User();
        getArticles();
    }, [])

    useEffect(() => {
    }, [user])

    return (
        <BrowserRouter>
            <div className={["wrapper", darkTheme ? 'dark-theme' : 'light-theme'].join(' ')}>
                <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} user={user} setUser={setUser} />
                <div className="app-wrapper">
                    <Routes>
                        {allArticles.map(a =>
                            <Route key={a.description} path={"/articles/" + (cyrillicToTranslit().transform((a.title), "_")).replaceAll('_', '') + a.date.replaceAll('.', '-').replaceAll('/', '-')} element={<Article article={a} />} />
                        )}
                    </Routes>
                    {user.name ?
                        <Routes>
                            <Route path='/user' exact element={<UserPage user={user} />} />
                            <Route path='/create' element={<MainPage user={user} setAllArticles={setAllArticles} />} />
                            <Route path="/registration" element={<Navigate replace to="/user" />} />
                            <Route path="/authorisation" element={<Navigate replace to="/user" />} />
                        </Routes>
                        :
                        <Routes>
                            <Route path='/registration' element={<Registration setUser={setUser} />} />
                            <Route path='/authorization' element={<Authorization />} />
                            <Route path='/create' element={<MainPage />} />
                            {/* <Route path="/create" element={<Navigate replace to="/registration" />} /> */}
                        </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App