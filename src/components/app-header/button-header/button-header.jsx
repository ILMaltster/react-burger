import React, { useState } from 'react';
import buttonHeaderStyle from './button-header.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function ButtonHeader({icon, children, ...props}){
    const Icon = icon;
    
    const GetButtonStyle = ({isActive}) =>{
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

ButtonHeader.propTypes = {
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.elementType.isRequired,
    active: PropTypes.bool
}