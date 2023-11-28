import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './forgot-password.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

function ForgotPassword() {
    const [passwordValue, setPasswordValue] = useState('password');
    const onChange = e => e.target.name ? setPasswordValue(e.target.value) : passwordValue;
    const onClick = () => {
        console.log({setPasswordValue});
    }
    const dispatch = useDispatch();
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Восстановление пароля</h1>
                <form action="" className={style.login__form}>
                    <PasswordInput
                        onChange={onChange}
                        value={passwordValue}
                        name={'password'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                        Восстановить
                    </Button>
                </form>
            </div>
            <div className={style.login__redirect}>
                <div className={style.href}>
                    <p className="text text_type_main-small text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <Link to={'/login'} className={`${style.href} text text_type_main-small`}>Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword