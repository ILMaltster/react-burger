import React from 'react'
import resetPaswordStyle from './reset-password.module.css';
import AuthContainer from '../../ui/auth-container';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../../ui/custom-link';
import { Navigate, useNavigate } from 'react-router-dom';
import resetPassword from '../../utils/api/resetPassword';
import { FORGOT_PASSWORD_FLAG } from '../../utils/consts';
import { useForm } from '../../hooks/useForm';

export default function ResetPasswordPage(){
    const navigate = useNavigate()
    const [formData, writeChangesFrom] = useForm({password: "", token: ""});

    function formSubmitHandler(e: React.FormEvent){
        e.preventDefault();
        resetPassword(formData).then(()=>{
            localStorage.removeItem(FORGOT_PASSWORD_FLAG);
            navigate("/login")
        })
    }

    if(!localStorage.getItem(FORGOT_PASSWORD_FLAG)) 
        return <Navigate to="/"/>

    return(
        <AuthContainer>
            <div className='text text_type_main-medium mb-6'>
                Восстановление пароля
            </div>
            <form onSubmit={formSubmitHandler} className={resetPaswordStyle.form}>
                <PasswordInput 
                    value={formData.password} 
                    onChange={writeChangesFrom} 
                    name="password" placeholder='Введите новый пароль'
                />
                <Input 
                    value={formData.token} 
                    onChange={writeChangesFrom} 
                    name="token" type='text' 
                    placeholder='Введите код из письма'
                />
                <Button 
                    extraClass={resetPaswordStyle.submitButton} 
                    type="primary"
                    htmlType="submit"
                >
                    Сохранить
                </Button>
            </form>
            <div className='mt-20 text text_type_main-default'>
                Вспомнили пароль? <CustomLink to="/login">Войти</CustomLink>
            </div>

        </AuthContainer>
    )
}