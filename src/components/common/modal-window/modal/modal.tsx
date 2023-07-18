import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const portal = document.getElementById("react-modals");

interface IModalWindowProps extends React.PropsWithChildren{
    onClose: ()=> void;
    title?: string;
    maxWidth?: string;
}

export default function Modal({children, onClose, title = "", maxWidth="min-content"}: IModalWindowProps) : React.ReactElement{
    useEffect(()=>{

        function keyListener(e: KeyboardEvent){
            if(e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', keyListener)
        return(()=>{
            document.removeEventListener('keydown', keyListener);
        })
    }, [onClose])
    
    return ReactDOM.createPortal(
        <div className={modalStyle.modalWrapper}>
            <ModalOverlay onClick={onClose}>
                <div style={{maxWidth: maxWidth}} className={`${modalStyle.window}`} onClick={(event) =>event.stopPropagation()}>
                    <div className={modalStyle.titleAndXmark}>
                        <div className={`${modalStyle.title} text text_type_main-medium`}>
                            {title}
                        </div>
                        <div className={modalStyle.closeBlock} onClick={onClose}>
                            <CloseIcon type="primary"/>
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </div>
        , portal as HTMLElement)
    
}