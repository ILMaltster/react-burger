import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

export default function ModalOverlay({children, onClick}){
    
    return(
        <div className={modalOverlayStyle.overlay} onClick={onClick}>
            {children}
        </div>
    )
}