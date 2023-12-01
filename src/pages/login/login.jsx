import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import style from './login-page.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { login } from "../../utils/api";

function Login() {
    const [emailValue, setEmailValue] = useState('bob@example.com');
    const [passwordValue, setPasswordValue] = useState('password');
    const dispatch = useDispatch();
    const onChange = event => {
        event.target.name === 'email' ? setEmailValue(event.target.value) : setPasswordValue(event.target.value);
    }
    const onClick = () => {
        dispatch(login({emailValue, passwordValue}));
    }
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Вход</h1>
                <form action="" className={style.login__form}>
                    <EmailInput
                        onChange={onChange}
                        value={emailValue}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                        Войти
                    </Button>
                </form>
            </div>
            <div className={style.login__redirect}>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link to={'/register'} className={`${style.href} text text_type_main-small`}> Зарегистрироваться</Link>
                </div>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Link to={'/forgot-password'} className={`${style.href} text text_type_main-small`}>Восстановить пароль</Link>
                </div>
            </div>
        </div>
)
}

export default Login