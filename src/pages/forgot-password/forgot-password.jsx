import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import style from './forgot-password.module.css';
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../utils/api";

function ForgotPassword() {
    const [emailValue, setEmailValue] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const onChange = e => e.target.name ? setEmailValue(e.target.value) : setEmailValue;
    const navigate = useNavigate();
    const location = useLocation();
    const onClick = (e) => {
        e.preventDefault();
        forgotPassword({
            "email": emailValue
        }).then(r => r.success === true && navigate('/reset-password', {state: location.pathname}))
            .catch(err=>console.log(err));
    }
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Восстановление пароля</h1>
                <form action="" className={style.login__form} onSubmit={onClick}>
                    <EmailInput
                        onChange={onChange}
                        value={emailValue}
                        error={false}
                        errorText={'Поле "E-mail" не может быть пустым'}
                        name={'email'}
                        isIcon={false}
                    />
                    <Button htmlType="submit" type="primary" size="large"
                            disabled={emailValue === ''}>
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