import './Button.css'

function Button({ children, ...props }) {

    return (
        <div className="button-wrapper">
            <button {...props} className={[props.className, 'button'].join(' ')} type={props.type ? props.type : 'button'}>
                <span className='button-text'>{children}</span>
            </button>
            <span className='button-decorate'></span>
        </div>
    )
}

export default Button;