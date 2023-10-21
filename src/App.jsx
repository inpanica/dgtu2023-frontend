import { useEffect, useState } from 'react'
import Header from './components/header/Header';
import Registration from './components/registration/Registration.jsx';
import Authorization from './components/authorization/Authorization.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './components/userpage/UserPage.jsx';
import Feild from './components/feild/Feild.jsx';
import './App.css'
import MainPage from './components/mainpage/mainPage.jsx';
import { getUser } from './components/actions';

function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [user, setUser] = useState({ 'email': '', 'name': '' })

    useEffect(() => {
        setDarkTheme(localStorage.getItem('theme') === 'dark');
        const User = async () => {
            if (localStorage.getItem('access')) {
                const r = await getUser()
                setUser({ 'email': r.data.email, 'name': r.data.name })
            }
        }
        User();
    }, [])

    useEffect(() => {
    }, [user])

    return (
        <BrowserRouter>
            <div className={["wrapper", darkTheme ? 'dark-theme' : 'light-theme'].join(' ')}>
                <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} user={user} setUser={setUser}/>

                {user.name ?
                    <Routes>
                        <Route path='/user' element={<UserPage user={user}/>} />
                        <Route path='/' exact element={<MainPage/>} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path='/registration' element={<Registration setUser={setUser}/>} />
                        <Route path='/authorization' element={<Authorization />} />
                        <Route path='/' exact element={<MainPage/>} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                }

                <div className="ctn">
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App