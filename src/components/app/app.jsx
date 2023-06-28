import {useEffect} from 'react'
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import * as pages from "../../pages";
import Profile from '../profile';
import Modal from '../common/modal-window/modal/modal';
import IngredientDetail from '../burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { loadIngredients } from '../../services/all-ingredients/actions';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../protected-route';
import { checkUser } from '../../services/user/actions';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadIngredients());
    dispatch(checkUser());
  }, []);

  const handleModalClose = ()=>{
    navigate(-1);
  }

  return (
    <div className={appStyles.container}>
      <AppHeader/>
      <main className='pr-4 pl-4'>
        <Routes location={background || location}>
          <Route path='/' element={<pages.ConstructorPage/>}/>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetail/>}/>
          <Route path='/login' element={<OnlyUnAuthRoute component={<pages.LoginPage/>}/>}/>
          <Route path='/register' element={<OnlyUnAuthRoute component={<pages.RegisterPage/>}/>}/>
          <Route path='/forgot-password' element={<OnlyUnAuthRoute component={<pages.ForgotPasswordPage/>}/>}/>
          <Route path='/reset-password' element={<OnlyUnAuthRoute component={<pages.ResetPasswordPage/>}/>}/>
          <Route path='/profile' element={<OnlyAuthRoute component={<pages.ProfilePage/>}/>}>
            <Route path='' element={<Profile/>}/>
            <Route path='orders' element={<Profile/>}/>
            <Route path='*' element={<Profile/>}/>
          </Route>
        </Routes>

        {
          background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal onClose={handleModalClose} maxWidth="650px">
                    <IngredientDetail/>
                  </Modal>
                }
              />
            </Routes>
          )
        }

      </main>
    </div>
  );
}