import style from './profile.module.css'
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useState} from "react";
function Profile() {
    const [value, setValue] = useState('bob@example.com')
    const store = useSelector(store=>store);

    const onIconClick = (e) => {
        console.log(e.target);
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
                    placeholder={'placeholder'}
                    onChange={e => setValue(e.target.value)}
                    icon={'EditIcon'}
                    value={value}
                    name={'Имя'}
                    error={false}
                    onIconClick={e => onIconClick(e)}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={e => setValue(e.target.value)}
                    value={value}
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