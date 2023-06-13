import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/all-ingredients/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(store=>store.allIngredients)

  useEffect(()=>{
    dispatch(loadIngredients());
  },[])

  return (
    <div className={appStyles.container}>
      <AppHeader/>
      <main className={`${appStyles.main} pr-4 pl-4`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  );
}