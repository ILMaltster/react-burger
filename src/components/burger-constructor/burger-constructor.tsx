import React, {useEffect, useMemo, useState} from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import ElementWrapper from './element-wrapper/element-wrapper';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../common/modal-window/modal/modal';
import OrderDetails from './order-details/order-details';
import {INGREDIENT_TYPES} from '../../utils/consts'
import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {addIngredientToConstructor, deleteIngredient, resetConstructor} from '../../services/constructor/reducer';
import {decreaseItemCount, increaseItemCount, resetItemCount} from '../../services/all-ingredients/reducer';
import PlugIngredient from './plug-ingredient/plug-ingredient';
import {uploadOrderIngredients} from '../../services/order/action';
import {resetOrderDetails} from '../../services/order/reducer';
import {useNavigate} from 'react-router-dom';
import {IIngredient, IIngredientWithKey, TUseDropConstuctor} from "../../utils/types";

export default function BurgerConstructor(): React.ReactElement{
    const navigate = useNavigate();
    // @ts-ignore
    const user = useSelector(function getStore(store) {return store.user.user});
    // @ts-ignore
    const constructorData = useSelector(function getStore(store) {return store.constructorIngredients});
    // @ts-ignore
    const orderStore = useSelector(store => store.order);

    const dispatch = useDispatch();

    const [, dropTarget] = useDrop<TUseDropConstuctor, void, undefined>({
        accept: "ingredient",
        drop(item){
            dispatch(addIngredientToConstructor({item : {...item, key: Math.random()}}));
            if(item.type === INGREDIENT_TYPES.BUN && constructorData.bun)
                dispatch(decreaseItemCount({id: constructorData.bun._id}))

            dispatch(increaseItemCount({id: item._id}))
        }
    })

    const [isNeedShow, setIsNeedShow] = useState<boolean>(false);

    const deleteIngredientFromConstructor = (item: IIngredientWithKey)=>{
        dispatch(decreaseItemCount({id: item._id}))
        dispatch(deleteIngredient({key: item.key}))
    }

    const calculateOrderPrice = useMemo(()=>{
        let price = 0;
        if(constructorData.mainIngredients)
            price += constructorData.mainIngredients.reduce(
                (accum: number, current: IIngredient) => accum + current.price, 0
            );
        
        if(constructorData.bun)
            price += constructorData.bun.price * 2

        return price;
    }, [constructorData.mainIngredients, constructorData.bun])

    const sendOrder = ()=>{
        if(!user){
            navigate("/login");
            return;
        }
        let ids = [...constructorData.mainIngredients.map((elem: IIngredient) => elem._id), constructorData.bun?._id];
        // @ts-ignore
        dispatch(uploadOrderIngredients(ids))
    }

    useEffect(()=>{
        if(orderStore.order !== null){
            setIsNeedShow(true)
        }
    }, [orderStore])

    useEffect(()=>{
        if(!orderStore.isLoading && !orderStore.error) {
            // @ts-ignore
            dispatch(resetItemCount());
            dispatch(resetConstructor());
        }
    }, [orderStore.isLoading, orderStore.error])

    const closeOrderDetailsWindow = ()=>{
        setIsNeedShow(false);
        dispatch(resetOrderDetails());
    }

    const GetConstructorLoadingStyle = ()=>{
        if(orderStore.isLoading) return { opacity: "0.5" }
    }

    return(
        <div className={`${burgerConstructorStyle.constructorStyle}`}>
            <div 
                ref={dropTarget} 
                style={GetConstructorLoadingStyle()}
                className={`${burgerConstructorStyle.containerWrapper} mt-25`}
            >
                {
                    constructorData.bun ?
                    <ElementWrapper 
                        ingredient={constructorData.bun}
                        isLocked={true}
                        className="mb-4 pr-4" 
                        type='top' 
                    />
                    :
                    <PlugIngredient text="Перенесите булку" type="top"/>
                }
                <div className={`${burgerConstructorStyle.container} custom-scroll`}>
                    {
                        constructorData.mainIngredients && constructorData.mainIngredients.length > 0 ?
                        constructorData.mainIngredients.map((elem: IIngredientWithKey)=>(
                        <ElementWrapper
                            ingredient={elem}
                            key={elem.key}
                            handleClose={()=>deleteIngredientFromConstructor(elem)}
                        />
                    ))
                    :
                    <PlugIngredient text="Перенесите ингредиенты"/>
                }
                </div>
                {
                    constructorData.bun ?
                    <ElementWrapper 
                        ingredient={constructorData.bun}
                        isLocked={true}
                        className="mt-4 pr-4" 
                        type='bottom' 
                    />
                    :
                    <PlugIngredient text="Перенесите булку" type="bottom"/>
                }
            </div>
            <div className={`${burgerConstructorStyle.submit} mt-10`}>
                <Button 
                    disabled={!constructorData.bun && !(constructorData.mainIngredients.length > 0)}
                    size="large" htmlType='submit' 
                    onClick={sendOrder}
                >
                    {
                        orderStore.isLoading ?
                        "Оформляем..."
                        :
                        "Оформить заказ"
                    }
                </Button>
                <div className={`${burgerConstructorStyle.currency} text text_type_digits-medium mr-10`}>
                    <div className='mr-2'>
                        { calculateOrderPrice }
                    </div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            {
                isNeedShow && 
                <Modal onClose={closeOrderDetailsWindow} maxWidth='720px'>
                    <OrderDetails/>
                </Modal>
            }
        </div>
    )
}