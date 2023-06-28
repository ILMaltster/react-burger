import profileStyle from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, fetchPatchUser } from '../../services/user/actions';

export default function Profile(){
    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({...user, password: ''});
    const [buttonState, setButtonState] = useState(false);

    useEffect(()=>{
        dispatch(fetchGetUser());
    }, [])

    function writeChangesForm(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function formSubmitHandler(e){
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
            else if(formData[key] !== user[key])
                return true;
        }
        return false;
    }

    function restoreForm(e){
        e.preventDefault();
        setFormData({...user, password: ""});
    }

    return(
        <form className={profileStyle.container} onSubmit={formSubmitHandler}>
            <Input 
                value={formData.name} 
                onChange={writeChangesForm} 
                name='name'
                placeholder='Имя' icon='EditIcon'
            />
            <EmailInput 
                value={formData.email} 
                onChange={writeChangesForm} 
                name='email'
                placeholder='E-mail' icon='EditIcon'
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