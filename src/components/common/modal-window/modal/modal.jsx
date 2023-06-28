import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const portal = document.getElementById("react-modals");

export default function Modal({children, onClose, title = "", maxWidth="min-content"}){
    useEffect(()=>{

        function keyListener(e){
            if(e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', keyListener)
        return(()=>{
            document.removeEventListener('keydown', keyListener);
        }
        )
    }, [onClose])
    
    return ReactDOM.createPortal(
        <div className={modalStyle.modalWrapper}>
            <ModalOverlay onClick={onClose}>
                <div style={{maxWidth: maxWidth}} className={`${modalStyle.window}`} onClick={(event) =>event.stopPropagation()}>
                    <div className={modalStyle.titleAndXmark}>
                        <div className={`${modalStyle.title} text text_type_main-large`}>
                            {title}
                        </div>
                        <div className={modalStyle.closeBlock} onClick={onClose}>
                            <CloseIcon/>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </div>
        , portal)
    
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired, 
    title: PropTypes.string, 
    width: PropTypes.string
}