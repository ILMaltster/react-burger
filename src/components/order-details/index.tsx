import orderDetailsStyle from './order-details.module.css'
import fillEmptySpacesZeros from "../../utils/fillEmptySpacesZeros";
import React, {useEffect, useMemo} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getOrderInfoByNumber} from "../../services/order/action";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {TConstructorIngredient, TOrderStatus, TSelectedOrderInfo, TSelectedOrderIngredient} from "../../utils/types";
import GetStatusTitle from "../../ui/order-status";
import Ingredient from "../orders-item/ingredient";
import {FormattedDate, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails(): React.ReactElement{
    const {orderNumber} = useParams();
    const dispatch = useAppDispatch();
    const selectedOrder = useAppSelector(store => store.order.selectedOrder);
    const allIngredients = useAppSelector(store => store.allIngredients.data);

    const orderIngredients = useMemo((): TSelectedOrderInfo=>{
        let result: TSelectedOrderInfo = {ingredients:[], totalPrice:0};
        let totalPrice = 0;
        let groupedIngredients: TSelectedOrderIngredient[] = [];

        if(selectedOrder === null) return result;

        let selectedOrderIngredients = new Set(selectedOrder[0].ingredients);
        selectedOrderIngredients.forEach(ingredientId=>{
            let count = selectedOrder[0].ingredients.reduce((accum, elem)=>
                elem === ingredientId ? ++accum : accum, 0)

            let findedIngredient = allIngredients.find(elem => elem._id === ingredientId) as TConstructorIngredient;
            totalPrice += findedIngredient.type === "bun" ? findedIngredient.price * count : findedIngredient.price * count;
            groupedIngredients.push({count, ingredient: findedIngredient});

        })

        result.ingredients = groupedIngredients.sort((a, b ) =>
        {
            if(a.ingredient.type === "bun" && b.ingredient.type !== "bun") return -1;
            return 0;
        })
        result.totalPrice = totalPrice;
        return result;
    }, [selectedOrder])

    useEffect(()=>{
        if(orderNumber)
            dispatch(getOrderInfoByNumber(+orderNumber))
    }, [])

    return(
        <div className={orderDetailsStyle.container}>
            <div className={`${orderDetailsStyle.number} text text_type_digits-default`}>
                #{fillEmptySpacesZeros(selectedOrder ? selectedOrder[0]?.number : 0, 6)}
            </div>
            <div className={"text text_type_main-medium mt-10"}>
                {selectedOrder && selectedOrder[0].name}
            </div>
            <div className={`${orderDetailsStyle.status} mt-3`}>
                <GetStatusTitle isGlobalOrderFeed={false} status={selectedOrder ? selectedOrder[0].status : TOrderStatus.NONE}/>
            </div>
            <div className={"text text_type_main-medium mt-15"}>Состав:</div>
            <div className={`${orderDetailsStyle.structureContainer} custom-scroll mt-6`}>
                {orderIngredients.ingredients.map((elem,index) => (
                    <div key={index} className={orderDetailsStyle.ingredientItem}>
                        <div>
                            <Ingredient ingredient={elem.ingredient}/>
                        </div>
                        <div>{elem.ingredient.name}</div>
                        <div className={`${orderDetailsStyle.ingredientPriceContainer} text text_type_digits-default`}>
                            <div>{elem.count}</div>
                            <div className="ml-2 mr-2">x</div>
                            <div className={`${orderDetailsStyle.priceContainer} `}>
                                <div>{elem.ingredient.price}</div>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${orderDetailsStyle.someInfo} mt-10`}>
                <div className={"text"}>
                    <FormattedDate
                        className={"text text_type_main-default text_color_inactive"}
                        date={selectedOrder ? new Date(selectedOrder[0].createdAt) : new Date()}
                    />
                </div>
                <div className={`${orderDetailsStyle.priceContainer} text text_type_digits-default`}>
                    <div>{orderIngredients.totalPrice}</div>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}