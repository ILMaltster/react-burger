import {NavLink, NavLinkProps} from "react-router-dom"
import customLinkStyle from './custom-navlink.module.css'

interface IProps extends NavLinkProps{
    activeStyle: string;
    className: string;
    type: "default" | "large" | "medium";
}

interface INavLinkClassName{
    isActive: boolean;
    isPending: boolean;
}

export default function CustomNavLink({children, activeStyle, className = "",  type="default", ...props}: IProps){
    const textType = `text_type_main-${type}`;
    
    const getNavLinkClass = ({isActive}: INavLinkClassName)=>{
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