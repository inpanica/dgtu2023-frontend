import BurgerMenu from '../burger-menu/BurgerMenu.jsx'
import './Header.css'
import { Link } from 'react-router-dom'

function Header({darkTheme, setDarkTheme, user, setUser, ...props}) {
    return (
        <header className="header">
            <div className="ctn header-ctn">
                <Link className="h3-title logo" to='/'>Название</Link>
                <BurgerMenu darkTheme={darkTheme} setDarkTheme={setDarkTheme} user={user} setUser={setUser}/>
            </div>
        </header>
    )
}

export default Header
