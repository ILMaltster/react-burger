import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {data} from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App() {
  return (
    <div className={appStyles.container}>
      <AppHeader/>
      <main className={`${appStyles.main} pr-4 pl-4`}>
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor />
      </main>
    </div>
  );
}