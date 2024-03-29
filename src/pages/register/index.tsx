import registerStyle from './register.module.css';
import AuthContainer from '../../ui/auth-container';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../../ui/custom-link';
import { fetchRegister } from '../../services/user/actions';
import React from 'react';
import { useForm } from '../../hooks/useForm';
import {useAppDispatch} from "../../hooks/useAppDispatch";

export default function RegisterPage(){
    const [formData, writeChanges] = useForm({
        name: "", 
        email: "", 
        password: ""
    });
    
    const dispatch = useAppDispatch();

    function formSubmitHandler(e: React.FormEvent){
        e.preventDefault();
        dispatch(fetchRegister(formData));
    }

    return(
        <AuthContainer>
            <div className='text text_type_main-medium mb-6'>
                Регистрация
            </div>
            <form onSubmit={formSubmitHandler} className={registerStyle.form}>
                <Input 
                    value={formData.name} onChange={writeChanges}
                    name="name" type='text' 
                    placeholder='Имя'
                />
                <Input 
                    value={formData.email} onChange={writeChanges}
                    name="email" type='email' 
                    placeholder='E-mail'
                />
                <PasswordInput 
                    value={formData.password} onChange={writeChanges}
                    name="password" placeholder='Пароль'
                />
                <Button 
                    extraClass={registerStyle.submitButton} 
                    type="primary"
                    htmlType='submit'
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className='mt-20 text text_type_main-default'>
                Уже зарегистрированы? <CustomLink to="/login">Войти</CustomLink>
            </div>
        </AuthContainer>
    )
}