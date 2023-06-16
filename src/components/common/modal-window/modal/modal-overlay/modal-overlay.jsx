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
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
}