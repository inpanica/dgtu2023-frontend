import { useState } from 'react'
import './Burger.css'

function Burger({setBurgerMenuActive, ...props}) {

    const [burgerButtonActive, setBurgerButtonActive] = useState(false);

    const burgerFunction = () => {
        setBurgerButtonActive(!burgerButtonActive);
        setBurgerMenuActive(!burgerButtonActive);
    }

    return (
        <div className={['burger-button', burgerButtonActive ? 'burger-button-active' : ''].join(' ')} onClick={burgerFunction}>
            <span className='burger-button-line burger-button-line-top'></span>
            <span className='burger-button-line burger-button-line-middle'></span>
            <span className='burger-button-line burger-button-line-bottom'></span>
        </div>
    )
}

export default Burger