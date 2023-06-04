import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types'

export default function ModalOverlay({children, onClick}){
    
    return(
        <div className={modalOverlayStyle.overlay} onClick={onClick}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}