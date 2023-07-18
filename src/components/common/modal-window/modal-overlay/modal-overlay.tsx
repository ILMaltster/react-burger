import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

interface IModalOverlay extends React.PropsWithChildren{
    onClick:()=>void;
}

export default function ModalOverlay({children, onClick}: IModalOverlay): React.ReactElement{
    
    return(
        <div className={modalOverlayStyle.overlay} onClick={onClick}>
            {children}
        </div>
    )
}
