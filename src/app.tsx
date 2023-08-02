import {useEffect} from 'react'
import appStyles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import * as pages from "./pages";
import Profile from './components/profile-tabs/profile';
import Modal from './components/common/modal-window/modal/modal';
import IngredientDetail from './components/burger-ingredients/ingredient-details/ingredient-details';
import { loadIngredients } from './services/all-ingredients/actions';
import { OnlyAuthRoute, OnlyUnAuthRoute } from './components/protected-route';
import { checkUser } from './services/user/actions';
import OrdersHistory from "./components/profile-tabs/orders-history";
import OrderDetails from "./components/order-details";
import {useAppDispatch} from "./hooks/useAppDispatch";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const dispatch = useAppDispatch();

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
          <Route path='/feed' element={<pages.OrderFeedPage/>}/>
          <Route path='/feed/:orderNumber' element={<OrderDetails/>}/>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetail/>}/>
          <Route path='/login' element={<OnlyUnAuthRoute component={<pages.LoginPage/>}/>}/>
          <Route path='/register' element={<OnlyUnAuthRoute component={<pages.RegisterPage/>}/>}/>
          <Route path='/forgot-password' element={<OnlyUnAuthRoute component={<pages.ForgotPasswordPage/>}/>}/>
          <Route path='/reset-password' element={<OnlyUnAuthRoute component={<pages.ResetPasswordPage/>}/>}/>
          <Route path='/profile' element={<OnlyAuthRoute component={<pages.ProfilePage/>}/>}>
            <Route path='' element={<Profile/>}/>
            <Route path='*' element={<Profile/>}/>
            <Route path='orders' element={<OrdersHistory/>}/>
          </Route>
          <Route path='/profile/orders/:orderNumber' element={<OrderDetails/>}/>

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
              <Route
                  path='/feed/:orderNumber'
                  element={
                    <Modal onClose={handleModalClose} maxWidth="650px">
                      <OrderDetails/>
                    </Modal>
                  }
              />
              <Route
                  path='/profile/orders/:orderNumber'
                  element={
                    <Modal onClose={handleModalClose} maxWidth="650px">
                      <OrderDetails/>
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