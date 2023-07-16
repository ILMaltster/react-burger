import authContainerStyle from './auth-container.module.css';
import React from "react";

type Props = {
    children: React.ReactNode
};

export default function AuthContainer({children}: Props): React.ReactElement{
    return(
        <div className={authContainerStyle.container}>
            {children}
        </div>
    )
}
