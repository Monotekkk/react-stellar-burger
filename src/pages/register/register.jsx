import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './register-page.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registrationThunk} from "../../services/actions/thunkAction";

function Register() {
    const [emailValue, setEmailValue] = useState('timur.yakhin.99@yandex.ru');
    const [passwordValue, setPasswordValue] = useState('password');
    const [nameValue, setNameValue] = useState('Тимур');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(registrationThunk({emailValue, passwordValue, nameValue}, navigate));
    }
    const inputRef = useRef(null)
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Регистрация</h1>
                <form action="" className={style.login__form} onSubmit={onClick}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameValue(e.target.value)}
                        value={nameValue}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
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
                    <Button htmlType="submit" type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
            <div className={style.login__redirect}>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Link to={'/login'} className={`${style.href} text text_type_main-small`}> Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register