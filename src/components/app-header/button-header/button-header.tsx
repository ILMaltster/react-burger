import React from 'react';
import buttonHeaderStyle from './button-header.module.css';
import {NavLink, NavLinkProps} from 'react-router-dom';
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";


interface IButtonHeader extends NavLinkProps{
    icon: ({ type }: TIconProps) => JSX.Element;
    children: React.ReactNode;
}

export default function ButtonHeader({icon, children, ...props}: IButtonHeader): React.ReactElement{
    const Icon = icon;
    
    const GetButtonStyle = ({isActive}: {isActive: boolean}) =>{
        return `${buttonHeaderStyle.button} 
        p-5 text text_type_main-default 
        ${(isActive && buttonHeaderStyle.active)}`
    }

    return(
        <NavLink {...props} className={GetButtonStyle}>
            <div className={`${buttonHeaderStyle.iconWrapper} mr-2`}>
                <Icon type={"secondary"}/>
            </div>
            {children}
        </NavLink>
    )
}