import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import style from './login-page.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginThunk} from "../../services/actions/thunkAction";

function Login() {
    const [emailValue, setEmailValue] = useState('timur.yakhin.99@gg.ru');
    const [passwordValue, setPasswordValue] = useState('password');
    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(loginThunk({emailValue, passwordValue}));
    }
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Вход</h1>
                <form action="" className={style.login__form} onSubmit={onClick}>
                    <EmailInput
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="submit" type="primary" size="large" >
                        Войти
                    </Button>
                </form>
            </div>
            <div className={style.login__redirect}>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link to={'/register'}
                          className={`${style.href} text text_type_main-small`}> Зарегистрироваться</Link>
                </div>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Link to={'/forgot-password'} className={`${style.href} text text_type_main-small`}>Восстановить
                        пароль
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login