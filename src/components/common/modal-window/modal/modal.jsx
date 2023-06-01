import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const portal = document.getElementById("react-modals");

export default function Modal({children, onClose, title = ""}){
    
    const windowWrapperRef = useRef();

    useEffect(()=>{
        windowWrapperRef.current.addEventListener('keypress', function keyListener(e){
            console.log(e);
        })

    }, [windowWrapperRef])
    
    return ReactDOM.createPortal(
        <div ref={windowWrapperRef} className={modalStyle.modalWrapper}>
            <ModalOverlay onClick={onClose}>
                <div className={`${modalStyle.window}`} onClick={(event) =>event.stopPropagation()}>
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