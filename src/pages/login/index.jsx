import {useState} from 'react'
import loginStyle from './login.module.css';
import AuthContainer from '../../ui/auth-container';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../../ui/custom-link';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../services/user/actions';
export default function LoginPage(){

    const [formData, setFormData] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    function writeChangesFrom(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function formSubmitHandler(e){
        e.preventDefault();
        dispatch(fetchLogin(formData));
    }

    return(
        <AuthContainer>
            <div className='text text_type_main-medium mb-6'>Вход</div>
            <form 
                onSubmit={formSubmitHandler} 
                className={loginStyle.form}
            >
                <Input value={formData.email} onChange={writeChangesFrom} 
                    name="email" type='email' placeholder='E-mail'
                />
                <PasswordInput value={formData.password}  onChange={writeChangesFrom} 
                    name="password" placeholder='Пароль'/>
                <Button 
                    extraClass={loginStyle.submitButton} 
                    type="primary"
                    htmlType='submit'
                >
                    Войти
                </Button>
            </form>
            <div className='mt-20 text text_type_main-default'>
                Вы - новый пользователь? <CustomLink to="/register">Зарегистрироваться</CustomLink>
            </div>
            <div className='mt-4 text text_type_main-default'>
                Забыли пароль? <CustomLink to="/forgot-password">Восстановить пароль</CustomLink>
            </div>
        </AuthContainer>
    )
}