import orderHistoryStyle from './orders-history.module.css';
import OrdersList from "../../orders-list";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {connectOwnOrderHistory, disconnectOwnOrderHistory} from "../../../services/own-order-history/actions";
import {WS_SERVER_ADDRESS_OWN_ORDERS} from "../../../utils/consts";


export default function OrdersHistory(){
    const {data} = useAppSelector(store=>store.ownOrderHistory)

    const dispatch = useAppDispatch()
    useEffect(()=>{
        const accessToken = (localStorage.getItem('accessToken') as string)?.replace("Bearer ", '');
        dispatch(connectOwnOrderHistory(`${WS_SERVER_ADDRESS_OWN_ORDERS}?token=${accessToken}`))
        return ()=>{
            dispatch(disconnectOwnOrderHistory());
        }
    }, [])

    return(
        <div className={`${orderHistoryStyle.container} mt-10`}>
            <OrdersList orderList={data?.orders}/>
        </div>
    )
}