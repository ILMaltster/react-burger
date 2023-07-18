import forgotPasswordStyle from './forgot-password.module.css';
import AuthContainer from '../../ui/auth-container';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../../ui/custom-link';
import forgotPassword from '../../utils/api/forgotPassword';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_FLAG } from '../../utils/consts';
import { useForm } from '../../hooks/useForm';
import {FormEvent} from "react";

export default function ForgotPasswordPage(){
    
    const navigate = useNavigate();
    const [formData, writeChangesFrom] = useForm({email: ""});

    function formSubmitHandler(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        forgotPassword(formData)
            .then(()=>{
                localStorage.setItem(FORGOT_PASSWORD_FLAG, "1");
                navigate("/reset-password");
            });
    }

    return(
        <AuthContainer>
            <div className='text text_type_main-medium mb-6'>
                Восстановление пароля
            </div>
            <form onSubmit={formSubmitHandler} className={forgotPasswordStyle.form}>
                <Input 
                    name="email" type='email' 
                    value={formData.email} onChange={writeChangesFrom} 
                    placeholder='Укажите e-mail'
                />
                <Button 
                    extraClass={forgotPasswordStyle.submitButton} 
                    type="primary"
                    htmlType="submit"
                >
                    Восстановить
                </Button>
            </form>
            <div className='mt-20 text text_type_main-default'>
                Вспомнили пароль? <CustomLink to="/login">Войти</CustomLink>
            </div>

        </AuthContainer>
    )
}