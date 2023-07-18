import {useEffect, useState} from 'react'
import CustomNavLink from "../../ui/custom-navlink";
import profileStyle from "./profile.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { PROFILE_TAB_DESCRIPTION_ORDER_HISTORY, PROFILE_TAB_DESCRIPTION_PROFILE } from '../../utils/consts';
import CustomButtonFakeNavLink from '../../ui/custom-button-fake-navlink';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../services/user/actions';

export default function ProfilePage(){
    const location = useLocation();
    const [description, setDescription] = useState<string>(PROFILE_TAB_DESCRIPTION_PROFILE);
    const dispatch = useDispatch();
    useEffect(()=>{
        const pathElements = location.pathname.split('/');
        const currentPage = pathElements.at(-1) === "" ? pathElements.at(-2) : pathElements.at(-1);
        switch(currentPage){
            case 'profile':
                setDescription(PROFILE_TAB_DESCRIPTION_PROFILE)
                break;
            case 'orders':
                setDescription(PROFILE_TAB_DESCRIPTION_ORDER_HISTORY)
                break;
        }
    }, [location])

    // @ts-ignore
    const logout = ()=>dispatch(fetchLogout())

    return(
        <div className={`${profileStyle.container}`}>
            <div className={`${profileStyle.nav} mt-30`}>
                <CustomNavLink 
                    to="/profile" 
                    type="medium" 
                    activeStyle={profileStyle.activeLink}
                    className="text_color_inactive pt-4 pb-4"
                >
                    Профиль
                </CustomNavLink>
                <CustomNavLink 
                    to="orders" 
                    type="medium" 
                    activeStyle={profileStyle.activeLink}
                    className="text_color_inactive pt-4 pb-4"
                >
                    История заказов
                </CustomNavLink>
                <CustomButtonFakeNavLink 
                    type="medium" 
                    className="text_color_inactive pt-4 pb-4"
                    onClick={logout}
                >
                    Выход
                </CustomButtonFakeNavLink>
                <div className={`${profileStyle.description} text text_type_main-default text_color_inactive mt-8`}>
                    {description}
                </div>
            </div>
            <Outlet/>
        </div>
    )
}