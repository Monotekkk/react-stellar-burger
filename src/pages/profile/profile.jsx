import style from './profile.module.css'
import {useDispatch} from "react-redux";
import {logOutThunk} from "../../service/middleware";
import {Link, Outlet} from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    return (
        <div className={style.profileBlock}>
            <aside className={style.aside}>
                <ul>

                    <li className={`text text_type_main-medium ${style.asideMenuItem}`}>
                        <Link
                            className={style.link}
                            to={'/profile'}>
                            Профиль
                        </Link>
                    </li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.asideMenuItem}`}>
                        <Link
                            to={'/profile/orders'}
                            className={style.link}>
                            История заказов
                        </Link>
                    </li>
                    <li onClick={() => dispatch(logOutThunk())}
                        className={`text text_type_main-medium text_color_inactive ${style.asideMenuItem}`}>Выход
                    </li>
                </ul>
                <p className={`${style.paragraph} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете <br/>
                    изменить свои персональные данные
                </p>
            </aside>
            <article className={`${style.article} custom-scroll`}>
                <Outlet/>
            </article>
        </div>
    )
}

export default Profile;