import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const portal = document.getElementById("react-modals");

export default function Modal({children, openFunc, title = "", closeFunc = null}){
    
    const windowWrapperRef = useRef();

    useEffect(()=>{
        openFunc = openWindow;
        closeFunc = closeWindow;

        windowWrapperRef.current && windowWrapperRef.current.addEventListener('keypress', function keyListener(e){
            console.log(e);
        })

    },[])

    function closeWindow(){
        windowWrapperRef.current.classList.remove(modalStyle.openned)
    }

    function openWindow(){
        windowWrapperRef.current.classList.add(modalStyle.openned)
    }
    
    return ReactDOM.createPortal(
            <div ref={windowWrapperRef} className={modalStyle.modalWrapper}>
                <ModalOverlay>
    
                <div className={`${modalStyle.window}`}>
                    <div className={modalStyle.titleAndXmark}>
                        <div className={`${modalStyle.title} text text_type_main-large`}>
                            {title}
                        </div>
                        <div className={modalStyle.closeBlock} onClick={closeWindow}>
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