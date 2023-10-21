import { useEffect, useState } from 'react'
import Burger from '../burger/Burger.jsx'
import './BurgerMenu.css'
import { Link } from 'react-router-dom'

function BurgerMenu({ darkTheme, setDarkTheme, user, setUser, ...props }) {

    const [burgerMenuActive, setBurgerMenuActive] = useState(false)

    const themeChange = () => {
        setDarkTheme(!darkTheme);
        localStorage.setItem('theme', !darkTheme ? 'dark' : 'light');
    }

    const logOut = () => {
        localStorage.removeItem('access');
    }

    return (
        <div className={["burger-menu", burgerMenuActive ? 'burger-menu-active' : ''].join(' ')}>
            <Burger setBurgerMenuActive={setBurgerMenuActive} />
            <div className="burger-menu-content">
                <p className="burger-menu-link" onClick={themeChange}>
                    {['Тема:', darkTheme ? 'тёмная' : 'светлая'].join(' ')}
                </p>
                {user.name ?
                    <>
                        <Link to='/user' className="burger-menu-link">Личный кабинет</Link>
                        <Link to='/' className="burger-menu-link" onClick={logOut}>Выйти</Link>
                    </>
                    :
                    <>
                        <Link to='/registration' className="burger-menu-link">Зарегистрироваться</Link>
                        <Link to='/authorization' className="burger-menu-link">Войти</Link>
                    </>
                }


            </div>
        </div>
    )
}

export default BurgerMenu
