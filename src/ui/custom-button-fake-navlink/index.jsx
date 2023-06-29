import customButtonFakeLinkStyle from './custom-button-fake-navlink.module.css';
import PropTypes from 'prop-types';

export default function CustomButtonFakeNavLink({children, className = "", onClick=()=>{}, type="default", ...props}){
    const textType = `text_type_main-${type}`;
    
    const getButtonFakeNavLinkClass = ()=>{
        return `${textType} ${customButtonFakeLinkStyle.link} ${className} text_color_inactive pt-4 pb-4`;
    }

    const linkOnClick = (e)=>{
        e.preventDefault();
        onClick();
    }

    return (
        <a onClick={linkOnClick} href='#' className={getButtonFakeNavLinkClass()} {...props}>
            {children}
        </a>
    )
}

CustomButtonFakeNavLink.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["default", "large", "medium"])
}