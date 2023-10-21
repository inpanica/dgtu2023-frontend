import CallbackForm from '../callback-form/CallbackForm.jsx';
import { authorization, getUser } from '../actions.js';

function Authorization() {

    const auth = async (email, name, password) => {
        r = await authorization(email, password);
        if(r.status === 200){
            const r2 = getUser()
        }
    }

    return (
        <div className="block">
            <div className="ctn">
                <h2 className="h2-title">Вход</h2>
                <CallbackForm buttonFunction={auth} buttonText={'Войти'} inputs={{ 'Email': 'Почта', 'Password': 'Пароль' }} photoRequired={false} />
            </div>
        </div>
    )
}

export default Authorization