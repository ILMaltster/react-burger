import orderItemStyle from './order-item.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "./ingredient";
import {ORDER_STATUS} from "../../utils/consts";
import {useCallback} from "react";
import {IIngredient} from "../../utils/types";

interface IOrdersItem{
    order: Array<IIngredient>;
    status: ORDER_STATUS;
}

export default function OrdersItem({order, status = ORDER_STATUS.NONE}: IOrdersItem) : React.ReactElement{

    const GetStatusTitle = useCallback(()=>{
        const defText = "text text_type_main-small mt-2"

        switch (status){
            case ORDER_STATUS.NONE:
                return null
            case ORDER_STATUS.CREATED:
                return (
                    <div className={defText}>
                        Создан
                    </div>
                )
            case ORDER_STATUS.COOKING:
                return (
                    <div className={defText}>
                        Готовится
                    </div>
                )
            case ORDER_STATUS.READY:
                return (
                    <div className={`${defText} ${orderItemStyle.statusReady}`}>
                        Выполнен
                    </div>
                )

        }
    }, [])
    return(
        <div className={orderItemStyle.container}>
            <div className={orderItemStyle.header}>
                <div className="text text_type_digits-default">#034355</div>
                <div className="text text_type_main-small text_color_inactive">Сегодня, 16:20</div>
            </div>
            <div className="text text_type_main-default">
                Death Star Starship main бургер
                <GetStatusTitle/>
            </div>


            <div className={orderItemStyle.details}>
                <div className={orderItemStyle.ingredientsList}>
                    {
                        order
                            .slice(0, order.length < 6 ? order.length : 6)
                            .map((elem, index, slicedOrder)=>(
                                <Ingredient
                                    ingredient={elem}
                                    index={index}
                                    slicedTotal={slicedOrder.length}
                                    total={order.length}
                                />
                            ))
                    }
                </div>
                <div className={orderItemStyle.price}>
                    <span className="text text_type_digits-default">420</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}