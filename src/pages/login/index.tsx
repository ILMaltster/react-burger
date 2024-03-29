import loginStyle from './login.module.css';
import AuthContainer from '../../ui/auth-container';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../../ui/custom-link';
import { fetchLogin } from '../../services/user/actions';
import { useForm } from '../../hooks/useForm';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {TLoginFormData} from "../../utils/types";



export default function LoginPage(){
    const [formData, writeChangesFrom] = useForm<TLoginFormData>({email: "", password: ""});
    const dispatch = useAppDispatch();

    function formSubmitHandler(e: React.SyntheticEvent){
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