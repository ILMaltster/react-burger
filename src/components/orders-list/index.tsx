import orderListStyle from './orders-list.module.css'
import OrdersItem from "../orders-item";
import {IIngredient} from "../../utils/types";

interface IOrdersList{
    orderList: Array<Array<IIngredient>>
}

export default function OrdersList({orderList}: IOrdersList){
    console.log(orderList);
    return(
        <div className={orderListStyle.container}>
            {
                orderList.map((elem, index)=>(
                    <OrdersItem order={elem} status={index}/>
                ))
            }
        </div>
    )
}