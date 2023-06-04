import React from 'react';
import buttonHeaderStyle from './button-header.module.css';
import PropTypes from 'prop-types';

export default function ButtonHeader({icon, children, active = false}){
    const Icon = icon;

    const GetButtonStyle = () =>
        `${buttonHeaderStyle.button} 
        p-5 text text_type_main-default 
        ${(active && buttonHeaderStyle.active)}`

    return(
        <a className={GetButtonStyle()}>
            <div className={`${buttonHeaderStyle.iconWrapper} mr-2`}>
                <Icon type={!active && "secondary"}/>
            </div>
            {children}
        </a>
    )
}
ButtonHeader.propTypes = {
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.elementType.isRequired,
    active: PropTypes.bool
}