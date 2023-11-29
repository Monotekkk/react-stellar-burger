import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './reset-password.module.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registration, resetPassword} from "../../utils/api";

function ResetPassword() {
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [token, setToken] = useState('');
    const onChange = e => {
        e.target.name === 'newPasswordValue' ? setNewPasswordValue(e.target.value) : e.target.name === 'token' ? setToken(e.target.value) : console.log('error');
    };
    const onClick = () => {
        registration().then(r => console.log(r));
        // resetPassword({
        //     "password": newPasswordValue,
        //     "token": token
        // }).then(r => console.log(r))
    }
    const dispatch = useDispatch();
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Восстановление пароля</h1>
                <form action="" className={style.login__form}>
                    <PasswordInput
                        onChange={onChange}
                        value={newPasswordValue}
                        name={'newPasswordValue'}
                        extraClass="mb-2"
                    />
                    <Input
                        onChange={onChange}
                        value={token}
                        name={'token'}
                        extraClass="mb-2"
                        placeholder={'Введите код из письма'}
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                        Сохранить
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