import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import style from './forgot-password.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPasswordThunk} from "../../services/actions/thunkAction";
function ForgotPassword() {
    const [emailValue, setEmailValue] = useState('');
    const onChange = e => e.target.name ? setEmailValue(e.target.value) : setEmailValue;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordThunk({
            emailValue, location, navigate
        }));


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