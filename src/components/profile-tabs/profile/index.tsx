import profileStyle from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FormEvent, useEffect, useState} from 'react';
import { fetchGetUser, fetchPatchUser } from '../../../services/user/actions';
import { useForm } from '../../../hooks/useForm';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {TUserData} from "../../../utils/types";

type TProfileFormData = TUserData &{
    password:string;
}

export default function Profile(){
    const user = useAppSelector(state => state.user.user) as TUserData;

    const dispatch = useAppDispatch();
    const [formData, writeChangesForm, setFormData] = useForm<TProfileFormData>({...user, password: ''});
    const [buttonState, setButtonState] = useState(false);

    useEffect(()=>{
        dispatch(fetchGetUser());
    }, [])

    function formSubmitHandler(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
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
            else if(formData[key as keyof TUserData] !== user[key as keyof TUserData])
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
                value={formData.name ? formData.name : ""}
                onChange={writeChangesForm} 
                name='name'
                placeholder='Имя'
            />
            <EmailInput 
                value={formData.email ? formData.email: ""}
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