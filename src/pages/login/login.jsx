import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import style from './login-page.module.css';
import {Link} from "react-router-dom";

function Login() {
    const [emailValue, setEmailValue] = useState('bob@example.com');
    const [passwordValue, setPasswordValue] = useState('password');
    const [values, setValues] = useState({});
    const onChange = event => {
        if (event.target.name) {


        } else {
            console.log('button');
        }
    }
    return (
        <div className={style.login__page}>
            <div className={style.login__form}>
                <h1 className={style.login__title}>Вход</h1>
                <form action="" className={style.login__form}>
                    <EmailInput
                        onChange={onChange}
                        value={setEmailValue}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={setPasswordValue}
                        name={'password'}
                        extraClass="mb-2"
                    />
                    <Button htmlType="button" type="primary" size="large" onClick={onChange}>
                        Войти
                    </Button>
                </form>
            </div>
            <div className={style.login__redirect}>
                <p className="text text_type_main-small text_color_inactive">
                    Вы — новый пользователь?
                </p>
                <span><Link to={'/'}/>Зарегистрироваться</span>
            </div>
        </div>
    )
}

export default Login