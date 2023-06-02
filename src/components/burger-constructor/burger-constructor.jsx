import React, {useState, useEffect} from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import ElementWrapper from './element-wrapper/element-wrapper';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modal-window/modal/modal';
import OrderDetails from './order-details/order-details';

export default function BurgerConstructor({ingredients}){
    const [isNeedShow, setIsNeedShow] = useState(false);

    const [fakeData, setFakeData] = useState({
        bun: undefined,
        mainIngredients: []
    }) 

    const getFakeOrderNumber = ()=> Math.round(Math.random()*999999-1);

    useEffect(()=>{
        setFakeData({
            bun: ingredients.find?.(elem => elem.type === 'bun'),
            mainIngredients: ingredients.filter?.(elem=>elem.type !== 'bun')
        })
    }, [ingredients])

    return(
        <div className={`${burgerConstructorStyle.constructorStyle}`}>
            <div className={`${burgerConstructorStyle.containerWrapper} mt-25`}>
                {
                    <ElementWrapper className="mb-4 pr-4" type='top' price={fakeData.bun?.price} text={fakeData.bun?.name} thumbnail={fakeData.bun?.image}/>
                }
                <div className={`${burgerConstructorStyle.container} custom-scroll pr-4`}>
                    {fakeData.mainIngredients.map(elem=>(
                        <ElementWrapper key={elem._id} price={elem.price} text={elem.name} thumbnail={elem.image}/>
                    ))}
                </div>
                {
                    <ElementWrapper className="mt-4 pr-4" type='bottom' price={fakeData.bun?.price} text={fakeData.bun?.name} thumbnail={fakeData.bun?.image}/>
                }
            </div>
            <div className={`${burgerConstructorStyle.submit} mt-10`}>
                <Button size="large" htmlType='submit' onClick={()=>setIsNeedShow(true)}>Оформить заказ</Button>
                <div className={`${burgerConstructorStyle.currency} text text_type_digits-medium mr-10`}>
                    <div className='mr-2'>
                        {fakeData.bun && fakeData.mainIngredients.reduce((accum, current) => accum + current.price, 0) + fakeData.bun.price * 2}
                    </div>
                    <CurrencyIcon/>
                </div>
            </div>
            {
                isNeedShow && 
                <Modal onClose={()=>setIsNeedShow(false)} width='720px'>
                    <OrderDetails orderNumber={getFakeOrderNumber()}/>
                </Modal>
            }
        </div>
    )
}
BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(
    {
        "_id": PropTypes.string.isRequired,
        "name":PropTypes.string.isRequired,
        "type":PropTypes.string.isRequired,
        "proteins":PropTypes.number.isRequired,
        "fat":PropTypes.number.isRequired,
        "carbohydrates":PropTypes.number.isRequired,
        "calories":PropTypes.number.isRequired,
        "price":PropTypes.number.isRequired,
        "image":PropTypes.string.isRequired,
        "image_mobile":PropTypes.string.isRequired,
        "image_large":PropTypes.string.isRequired,
        "__v":PropTypes.number.isRequired
    }
    ).isRequired).isRequired
}