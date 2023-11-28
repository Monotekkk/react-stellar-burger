import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './register-page.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

function Register() {
    const [emailValue, setEmailValue] = useState('bob@example.com');
    const [passwordValue, setPasswordValue] = useState('password');
    const [value, setValue] = useState('Антон');
    const onChange = event => {
        event.target.name === 'email' ? setEmailValue(event.target.value) : setPasswordValue(event.target.value);
    }
    const onClick = () => {
        console.log({emailValue, passwordValue});
    }
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Регистрация</h1>
                <form action="" className={style.login__form}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
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