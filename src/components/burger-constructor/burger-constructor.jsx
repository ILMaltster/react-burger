import React, {useState, useEffect} from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import ElementWrapper from './element-wrapper/element-wrapper';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../common/modal-window/modal/modal';
import OrderDetails from './order-details/order-details';
import {INGREDIENT_TYPE_BUN} from '../../utils/consts'
import {useSelector} from 'react-redux';

export default function BurgerConstructor(){
    const ingredients = useSelector(state=>state.allIngredients.data)

    const [isNeedShow, setIsNeedShow] = useState(false);
    const constructorData = useSelector(store => store.constructorIngredients)

    const getFakeOrderNumber = ()=> Math.round(Math.random()*999999-1);

    const [fakeData, setFakeData] = useState({
        bun: undefined,
        mainIngredients: []
    }) 

    useEffect(()=>{
        console.log(constructorData)
    },[constructorData])

    useEffect(()=>{
        setFakeData({
            bun: ingredients.find?.(elem => elem.type === INGREDIENT_TYPE_BUN),
            mainIngredients: ingredients.filter?.(elem=>elem.type !== INGREDIENT_TYPE_BUN)
        })
    }, [ingredients])

    return(
        <div className={`${burgerConstructorStyle.constructorStyle}`}>
            <div className={`${burgerConstructorStyle.containerWrapper} mt-25`}>
                {
                    <ElementWrapper className="mb-4 pr-4" type='top' price={constructorData.bun?.price} text={constructorData.bun?.name} thumbnail={constructorData.bun?.image}/>
                }
                <div className={`${burgerConstructorStyle.container} custom-scroll pr-4`}>
                    {constructorData.mainIngredients.map(elem=>(
                        <ElementWrapper key={elem._id} price={elem.price} text={elem.name} thumbnail={elem.image}/>
                    ))}
                </div>
                {
                    <ElementWrapper className="mt-4 pr-4" type='bottom' price={constructorData.bun?.price} text={constructorData.bun?.name} thumbnail={constructorData.bun?.image}/>
                }
            </div>
            <div className={`${burgerConstructorStyle.submit} mt-10`}>
                <Button size="large" htmlType='submit' onClick={()=>setIsNeedShow(true)}>Оформить заказ</Button>
                <div className={`${burgerConstructorStyle.currency} text text_type_digits-medium mr-10`}>
                    <div className='mr-2'>
                        {constructorData.bun && constructorData.mainIngredients.reduce((accum, current) => accum + current.price, 0) + constructorData.bun.price * 2}
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