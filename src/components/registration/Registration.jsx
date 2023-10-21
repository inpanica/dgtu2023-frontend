import CallbackForm from '../callback-form/CallbackForm.jsx';
import { authorization, registration, getUser } from '../actions.js';

function Registration({setUser, ...props}) {

    const reg = async (email, name, password) => {
        const r = await registration(email, name, password)
        if(r.statusText === 'Created'){
            const r2 = await authorization(email, password)
            if(r2.status === 200){
                const r3 = await getUser()
                setUser({'email' : r3.data.email, 'name': r3.data.name})
            }
        }
    }

    return (
        <div className="block">
            <div className="ctn">
                <h2 className="h2-title">Регистрация</h2>
                <CallbackForm buttonFunction={reg} buttonText={'Подтвердить'} inputs={{ 'Name': 'Имя', 'Email': 'Почта', 'Password': 'Пароль' }} photoRequired={false} />
            </div>
        </div>
    )
}

export default Registration