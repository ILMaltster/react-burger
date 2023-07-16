import profileStyle from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, fetchPatchUser } from '../../../services/user/actions';
import { useForm } from '../../../hooks/useForm';

export default function Profile(){
    // @ts-ignore
    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();
    const [formData, writeChangesForm, setFormData] = useForm({...user, password: ''});
    const [buttonState, setButtonState] = useState(false);

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchGetUser());
    }, [])

    function formSubmitHandler(e: React.SyntheticEvent){
        e.preventDefault();
        // @ts-ignore
        dispatch(fetchPatchUser(formData));
    }

    useEffect(()=>{
        setButtonState(!checkChanges());
    }, [formData])

    function checkChanges(){
        for(let key of Object.keys(formData)){
            if(key === "password") {
                if(formData[key].trim() !== '')   
                    return true; 
            }
            else if(formData[key] !== user[key])
                return true;
        }
        return false;
    }

    function restoreForm(e: React.SyntheticEvent){
        e.preventDefault();
        setFormData({...user, password: ""});
    }

    return(
        <form className={`${profileStyle.container} mt-30`} onSubmit={formSubmitHandler}>
            <Input 
                value={formData.name} 
                onChange={writeChangesForm} 
                name='name'
                placeholder='Имя'
            />
            <EmailInput 
                value={formData.email} 
                onChange={writeChangesForm} 
                name='email'
                placeholder='E-mail'
            />
            <PasswordInput 
                value={formData.password} 
                onChange={writeChangesForm} 
                name='password'
                placeholder='Пароль'
            />
            <div>
                <Button 
                    type='primary' 
                    disabled={buttonState}
                    htmlType='submit'
                >
                    Сохранить
                </Button>
                <Button 
                    type='primary'
                    htmlType='button' 
                    disabled={buttonState}
                    extraClass='ml-5'
                    onClick={restoreForm}
                >
                    Отмена
                </Button>
            </div>
        </form>
    )
}