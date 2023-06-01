import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { SERVER_ADDRESS } from '../../utils/consts';
import checkResponseAndReturnPromiseJson from '../../utils/checkResponseAndReturnPromiseJson';
import Modal from '../common/modal-window/modal/modal';

export default function App() {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: []
  })

  useEffect(()=>{
    fetch(`${SERVER_ADDRESS}/api/ingredients`)
      .then(res=> checkResponseAndReturnPromiseJson(res))
      .then(data => setIngredients(prev => ({...prev, ...data})))
      .catch(e=>{
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
      })
  },[])

  useEffect(()=>{
    console.log(ingredients);
  },[ingredients])

  return (
    <div className={appStyles.container}>
      <AppHeader/>
      <main className={`${appStyles.main} pr-4 pl-4`}>
        <BurgerIngredients ingredients={ingredients.data}/>
        <BurgerConstructor ingredients={ingredients.data}/>
      </main>
    </div>
  );
}