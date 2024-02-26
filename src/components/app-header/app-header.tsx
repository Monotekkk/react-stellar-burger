import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './app-header.module.css';
import {Link, useNavigate} from "react-router-dom";
import {refreshTokenThunk} from "../../services/actions/thunkAction";

function AppHeader() {
    return (
        <header className={`${stylesHeader.header} mb-10`}>
            <nav className={stylesHeader.nav}>
                <ul className={stylesHeader.ul}>
                    <li className={`${stylesHeader.li} ${stylesHeader.link}`}>
                        <Link className={`${stylesHeader.li} text text_type_main-default`} to={'/'}>
                            <BurgerIcon type="primary"/>
                            <p className={`${stylesHeader.paragraph}text text-color_inactive pr-9`}>Конструктор</p>
                        </Link>
                        <Link className={`${stylesHeader.li} text text_type_main-default`} to={'/feed'}>
                            <ListIcon type={"secondary"}/>
                            <p className={`${stylesHeader.paragraph}`}>Лента заказов</p>
                        </Link>
                    </li>
                    <li className={stylesHeader.logo}>
                        <Link to={'/'}><Logo/></Link>
                    </li>
                    <li>
                        <Link className={`text text_type_main-default ${stylesHeader.li} pr-9`} to={'/profile'}>
                            <ProfileIcon type="secondary"/>
                            <p className={stylesHeader.paragraph}>Личный кабинет</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;