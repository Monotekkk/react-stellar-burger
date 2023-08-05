import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesHeader from './app-header.module.css';

function AppHeader() {
    return (
        <header className={`${stylesHeader.header} mb-10`}>
            <nav className={stylesHeader.nav}>
                <ul className={stylesHeader.ul}>
                    <li className={`${stylesHeader.li} ${stylesHeader.li} ${stylesHeader.link}`}>
                        <a className={`${stylesHeader.li} text text_type_main-default`}>
                            <BurgerIcon type="primary"/>
                            <p className={`${stylesHeader.paragraph}text text-color_inactive pr-9`}>Конструктор</p>
                        </a>
                        <a className={`text text_type_main-default ${stylesHeader.li}`}>
                            <ListIcon type={"secondary"}/>
                            <p className={`${stylesHeader.paragraph}`}>Лента заказов</p>
                        </a>
                    </li>
                    <li className={stylesHeader.logo}>
                        <Logo/>
                    </li>
                    <li>
                        <a className={`text text_type_main-default ${stylesHeader.li} pr-9`}>
                            <ProfileIcon type="secondary"/>
                            <p className={stylesHeader.paragraph}>Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;