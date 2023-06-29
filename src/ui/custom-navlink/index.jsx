import { NavLink } from "react-router-dom"
import customLinkStyle from './custom-navlink.module.css'
import PropTypes from 'prop-types';

export default function CustomNavLink({children, activeStyle, className = "",  type="default", ...props}){
    const textType = `text_type_main-${type}`;
    
    const getNavLinkClass = ({isActive, isPending})=>{
        const styleClass = `${textType} ${customLinkStyle.link} ${className} text_color_inactive pt-4 pb-4`;
        
        return isActive && activeStyle ? 
        `${styleClass} ${activeStyle}` : 
        styleClass;
    }

    return (
    <NavLink {...props} className={getNavLinkClass} end>
        {children}
    </NavLink>
    )
}

CustomNavLink.propTypes = {
    children: PropTypes.any.isRequired,
    activeStyle: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(["default", "large", "medium"])
}