import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useRef} from "react";
import style from './reset-password.module.css';
import {Link, useLocation} from "react-router-dom";
import {resetPassword} from "../../utils/api";
import {useDispatch} from "react-redux";
import {resetPasswordThunk} from "../../services/actions/thunkAction";

function ResetPassword() {
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
       dispatch(resetPasswordThunk({newPasswordValue, token}))
    }
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={`${style.login__title} text_type_main-large`}>Восстановление пароля</h1>
                <form action="" className={style.login__form} onSubmit={onClick}>
                    <PasswordInput
                        onChange={e => setNewPasswordValue(e.target.value)}
                        value={newPasswordValue}
                        name={'newPasswordValue'}
                        extraClass="mb-2"
                    />
                    <Input
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        name={'token'}
                        extraClass="mb-2"
                        placeholder={'Введите код из письма'}
                    />
                    <Button htmlType="submit" type="primary" size="large">
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