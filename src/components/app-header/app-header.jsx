import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './app-header.module.css';
import {Link, useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    return (
        <header className={`${stylesHeader.header} mb-10`}>
            <nav className={stylesHeader.nav}>
                <ul className={stylesHeader.ul}>
                    <li className={`${stylesHeader.li} ${stylesHeader.li} ${stylesHeader.link}`}>
                        <Link className={`${stylesHeader.li} text text_type_main-default`} to={'/'}>
                                <BurgerIcon type="primary"/>
                                <p className={`${stylesHeader.paragraph}text text-color_inactive pr-9`}>Конструктор</p>
                        </Link>
                        <a className={`text text_type_main-default ${stylesHeader.li}`}>
                            <ListIcon type={"secondary"}/>
                            <p className={`${stylesHeader.paragraph}`}>Лента заказов</p>
                        </a>
                    </li>
                    <li className={stylesHeader.logo}>
                        <Logo/>
                    </li>
                    <li>
                            <Link className={`text text_type_main-default ${stylesHeader.li} pr-9`} to={'/login'}>
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