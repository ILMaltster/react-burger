import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './app-header.module.css';
import ButtonHeader from './button-header/button-header.jsx';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader(){
    return(
        <header className={appHeaderStyle.header + " p-4"}>
            <div className={appHeaderStyle.nav}>
                <ButtonHeader to="/" icon={BurgerIcon}>Конструктор</ButtonHeader>
                <ButtonHeader to="/orders" icon={ListIcon}>Лента заказов</ButtonHeader>
            </div>
            <div className={appHeaderStyle.logoWrapper}>
                <Logo />
            </div>
            <div className={appHeaderStyle.profileWrapper}>
                <ButtonHeader to="/profile" icon={ProfileIcon}>Личный кабинет</ButtonHeader>
            </div>
        </header>
    )
}