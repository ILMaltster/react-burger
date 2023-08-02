import orderFeedStyle from './order-feed.module.css';
import OrdersList from "../../components/orders-list";
import OrdersStatistics from "../../components/orders-statistics";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useEffect} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {connectGeneralOrderHistory} from "../../services/general-order-history/actions";
import {WS_SERVER_ADDRESS_GENERAL_ORDERS} from "../../utils/consts";
import {disconnectOwnOrderHistory} from "../../services/own-order-history/actions";

export default function OrderFeedPage(){
    const ingredients = useAppSelector(store => store.generalOrderHistory.data);
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(connectGeneralOrderHistory(`${WS_SERVER_ADDRESS_GENERAL_ORDERS}`));
        return ()=>{
            dispatch(disconnectOwnOrderHistory());
        }
    }, [])

    return(
        <div>
            <div className="text text_type_main-medium mb-5">Лента заказов</div>
            <div className={orderFeedStyle.container}>
                <OrdersList orderList={ingredients?.orders} isGlobalOrderFeed={true}/>
                <OrdersStatistics ordersInfo={ingredients}/>
            </div>
        </div>
    )
}