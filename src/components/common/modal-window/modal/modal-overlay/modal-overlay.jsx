import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

export default function ModalOverlay({children}, close){
    
    return(
        <div className={modalOverlayStyle.overlay}>
            {children}
        </div>
    )
}