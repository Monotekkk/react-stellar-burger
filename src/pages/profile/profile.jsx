import style from './profile.module.css'
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useRef, useState} from "react";
import {getUser} from "../../utils/api";
function Profile() {
    const [value, setValue] = useState('')
    const inputRef = useRef(null);
    const store = useSelector(store=>store.user.user);
    getUser().then(r => console.log(r));
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }
    return(
        <div className={style.profileBlock}>
            <aside className={style.aside}>
                <ul>
                    <li className={`text text_type_main-medium ${style.asideMenuItem}`}>Профиль</li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.asideMenuItem}`}>История заказов</li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.asideMenuItem}`}>Выход</li>
                </ul>
            </aside>
            <article className={style.article}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    icon={'EditIcon'}
                    value={store.user.name}
                    name={'Имя'}
                    error={false}
                    onIconClick={e => onIconClick(e)}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                    ref={inputRef}
                />
                <EmailInput
                    onChange={e => setValue(e.target.value)}
                    value={store.user.email}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'password'}
                    icon="EditIcon"
                />
            </article>
        </div>
    )
}
export default Profile;