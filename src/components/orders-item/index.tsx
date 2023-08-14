import orderItemStyle from './order-item.module.css'
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "./ingredient";
import {useMemo} from "react";
import {TConstructorIngredient, TOrderHistoryItem} from "../../utils/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import fillEmptySpacesZeros from "../../utils/fillEmptySpacesZeros";
import GetStatusTitle from "../../ui/order-status";
import {useLocation, useNavigate} from "react-router-dom";

interface IOrdersItem{
    order: TOrderHistoryItem;
    isGlobalOrderFeed?: boolean;
}

export default function OrdersItem({order, isGlobalOrderFeed = false}: IOrdersItem) : React.ReactElement{
    const navigate = useNavigate();
    const location = useLocation();
    const ingredientsCatalog = useAppSelector(store => store.allIngredients.data);

    const orderIngredients = useMemo(()=>{
        let res: TConstructorIngredient[] = [];
        order.ingredients.forEach(value => {
            let findedItem = ingredientsCatalog.find(catalogElem => catalogElem._id === value)
            findedItem && res.push(findedItem);
        })
        return res.sort((a, b ) => {if(a.type === "bun" && b.type !== "bun") return -1; return 0;});
    }, [order])

    const orderPrice = useMemo(()=>{
        return orderIngredients.reduce((accum, elem) =>
             accum + elem.price
        , 0);
    }, [orderIngredients])

    return(
        <div className={orderItemStyle.container} onClick={()=>navigate(
            `${order.number}`,
            {
                state: {background: location}
            }
            )}>
            <div className={orderItemStyle.header}>
                <div className="text text_type_digits-default">#{fillEmptySpacesZeros(order.number, 6)}</div>
                <div className="text text_type_main-small text_color_inactive"><FormattedDate date={new Date(order.createdAt)}/></div>
            </div>
            <div className="text text_type_main-default">
                {order.name}
                <GetStatusTitle status={order.status} isGlobalOrderFeed={isGlobalOrderFeed}/>
            </div>

            <div className={orderItemStyle.details}>
                <div className={orderItemStyle.ingredientsList}>
                    {
                        orderIngredients
                            .slice(0, orderIngredients.length < 6 ? orderIngredients.length : 6)
                            .map((elem, index, slicedOrder)=>(
                                <Ingredient
                                    key={index}
                                    ingredient={elem}
                                    index={index}
                                    slicedTotal={slicedOrder.length}
                                    total={orderIngredients.length}
                                />
                            ))
                    }
                </div>
                <div className={orderItemStyle.price}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}