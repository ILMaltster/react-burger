import {Link, LinkProps} from "react-router-dom"
import customLinkStyle from './custom-link.module.css'
import {ReactNode} from "react";

interface IProps extends LinkProps{
    children: ReactNode;
    className?: string;
    type?: "default" | "large" | "medium";
}

export default function CustomLink({children, className = "", type="default", ...props} : IProps){

    const textType = `text_type_main-${type}`;
    return (
    <Link {...props} className={`${textType} ${customLinkStyle.link} ${className}`}>
        {children}
    </Link>
    )
}