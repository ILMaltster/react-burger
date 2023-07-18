import customButtonFakeLinkStyle from './custom-button-fake-navlink.module.css';

interface Props extends React.AnchorHTMLAttributes<any>{
    children: React.ReactNode;
    className?: string;
    onClick?: ()=>void;
    type?: string;
}

export default function CustomButtonFakeNavLink(
    {
        children,
        className = "",
        onClick=()=>{},
        type="default",
        ...props
    }: Props): React.ReactElement{

    const textType = `text_type_main-${type}`;
    
    const getButtonFakeNavLinkClass = ()=>{
        return `${textType} ${customButtonFakeLinkStyle.link} ${className} text_color_inactive pt-4 pb-4`;
    }

    const linkOnClick = (e: React.MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault();
        onClick();
    }

    return (
        <a onClick={linkOnClick} href='#' className={getButtonFakeNavLinkClass()} {...props}>
            {children}
        </a>
    )
}