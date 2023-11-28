import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './reset-password.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

function ResetPassword() {
    const [emailValue, setEmailValue] = useState('bob@example.com');
    const onChange = e => e.target.name === 'email' ? setEmailValue(e.target.value) : emailValue;
    const onClick = () => {
        console.log({emailValue});
    }
    const dispatch = useDispatch();
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Восстановление пароля</h1>
                <form action="" className={style.login__form}>
                    <EmailInput
                        onChange={onChange}
                        value={''}
                        name={'email'}
                        isIcon={false}
                        placeholder={'Укажите e-mail'}
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

export default ResetPassword