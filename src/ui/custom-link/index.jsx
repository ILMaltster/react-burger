import { Link } from "react-router-dom"
import customLinkStyle from './custom-link.module.css'
import PropTypes from 'prop-types';

export default function CustomLink({children, className = "", type="default", ...props}){

    const textType = `text_type_main-${type}`;
    return (
    <Link {...props} className={`${textType} ${customLinkStyle.link} ${className}`}>
        {children}
    </Link>
    )
}

CustomLink.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(["default", "large", "medium"])
}