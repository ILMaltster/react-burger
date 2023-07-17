import {useEffect} from 'react'
import appStyles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import * as pages from "./pages";
import Profile from './components/profile-tabs/profile';
import Modal from './components/common/modal-window/modal/modal';
import IngredientDetail from './components/burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { loadIngredients } from './services/all-ingredients/actions';
import { OnlyAuthRoute, OnlyUnAuthRoute } from './components/protected-route';
import { checkUser } from './services/user/actions';
import OrdersHistory from "./components/profile-tabs/orders-history";
import OrderDetails from "./components/order-details";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadIngredients() as any);
    dispatch(checkUser() as any);
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
          <Route path='/orders' element={<pages.OrderFeedPage/>}/>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetail/>}/>
          <Route path='/login' element={<OnlyUnAuthRoute component={<pages.LoginPage/>}/>}/>
          <Route path='/register' element={<OnlyUnAuthRoute component={<pages.RegisterPage/>}/>}/>
          <Route path='/forgot-password' element={<OnlyUnAuthRoute component={<pages.ForgotPasswordPage/>}/>}/>
          <Route path='/reset-password' element={<OnlyUnAuthRoute component={<pages.ResetPasswordPage/>}/>}/>
          <Route path='/profile' element={<OnlyAuthRoute component={<pages.ProfilePage/>}/>}>
            <Route path='' element={<Profile/>}/>
            <Route path='*' element={<Profile/>}/>
            <Route path='orders' element={<OrdersHistory/>}/>
            <Route path='orders/:id' element={<OrderDetails/>}/>
          </Route>
        </Routes>

        {
          background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal title="Детали ингредиента" onClose={handleModalClose} maxWidth="650px">
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