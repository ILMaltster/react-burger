import React, {useEffect, useMemo, useState} from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import ElementWrapper from './element-wrapper/element-wrapper';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../common/modal-window/modal/modal';
import OrderDetails from './order-details/order-details';
import {INGREDIENT_TYPES} from '../../utils/consts'
import {useDrop} from 'react-dnd';
import {addIngredientToConstructor, deleteIngredient, resetConstructor} from '../../services/constructor/reducer';
import {decreaseItemCount, increaseItemCount, resetItemCount} from '../../services/all-ingredients/reducer';
import PlugIngredient from './plug-ingredient/plug-ingredient';
import {uploadOrderIngredients} from '../../services/order/action';
import {resetOrderDetails} from '../../services/order/reducer';
import {useNavigate} from 'react-router-dom';
import {IIngredient, IIngredientWithKey} from "../../utils/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export default function BurgerConstructor(): React.ReactElement{
    const navigate = useNavigate();
    const user = useAppSelector(function getStore(store) {return store.user.user});
    const constructorData = useAppSelector(function getStore(store) {return store.constructorIngredients});
    const orderStore = useAppSelector(store => store.order);

    const dispatch = useAppDispatch();

    const [, dropTarget] = useDrop<IIngredientWithKey, void, undefined>({
        accept: "ingredient",
        drop(item){
            dispatch(addIngredientToConstructor({...item, key: Math.random()}));
            if(item.type === INGREDIENT_TYPES.BUN && constructorData.bun)
                dispatch(decreaseItemCount( constructorData.bun._id));

            dispatch(increaseItemCount(item._id))
        }
    })

    const [isNeedShow, setIsNeedShow] = useState<boolean>(false);

    const deleteIngredientFromConstructor = (item: IIngredientWithKey)=>{
        dispatch(decreaseItemCount(item._id))
        dispatch(deleteIngredient(item.key))
    }

    const calculateOrderPrice = useMemo(()=>{
        let price = 0;
        if(constructorData.mainIngredients)
            price += constructorData.mainIngredients.reduce(
                (accum: number, current: IIngredient) => accum + current.price, 0
            );
        
        if(constructorData.bun)
            price += constructorData.bun.price

        return price;
    }, [constructorData.mainIngredients, constructorData.bun])

    const sendOrder = ()=>{
        if(!user){
            navigate("/login");
            return;
        }
        if(!constructorData.bun) return;
        let ids: string[] = [...constructorData.mainIngredients.map((elem: IIngredient) => elem._id), constructorData.bun._id];
        dispatch(uploadOrderIngredients(ids))
    }

    useEffect(()=>{
        if(orderStore.order !== null){
            setIsNeedShow(true)
        }
    }, [orderStore])

    useEffect(()=>{
        if(orderStore.isNeedResetConstructor) {
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