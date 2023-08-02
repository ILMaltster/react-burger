import orderListStyle from './orders-list.module.css'
import OrdersItem from "../orders-item";
import {TOrderHistoryItem} from "../../utils/types";

interface IOrdersList{
    orderList: TOrderHistoryItem[] | null | undefined;
    isGlobalOrderFeed?: boolean;
}

export default function OrdersList({orderList, isGlobalOrderFeed = false}: IOrdersList){
    return(
        <div className={orderListStyle.container}>
            {
                orderList?.map((elem)=>(
                    <OrdersItem key={elem.number} order={elem} isGlobalOrderFeed={isGlobalOrderFeed}/>
                ))
            }
        </div>
    )
}