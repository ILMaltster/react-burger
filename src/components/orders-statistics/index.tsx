import orderStatisticsStyle from './order-statistics.module.css';
import fillEmptySpacesZeros from "../../utils/fillEmptySpacesZeros";
import {TWSOrderHistoryData} from "../../utils/types";
import {ReactElement, useMemo} from "react";


interface IOrdersStatisticksData{
    ordersInfo: TWSOrderHistoryData | null;
}

export default function OrdersStatistics({ordersInfo}: IOrdersStatisticksData): ReactElement{

    const lastReadyOrders = useMemo(()=>{
        return ordersInfo?.orders.filter(elem=>elem.status === "done").slice(0, 10).map(elem=> elem.number)
    }, [ordersInfo])

    const lastInWordOrders = useMemo(()=>{
        return ordersInfo?.orders.filter(elem=>elem.status === "pending").slice(0, 10).map(elem=> elem.number)
    }, [ordersInfo])


    return(
        <div className={orderStatisticsStyle.container}>
            <div className={orderStatisticsStyle.ordersStates}>
                <div className={orderStatisticsStyle.stateReady}>
                    <div className="text text_type_main-medium mb-6">
                        Готовы
                    </div>
                    <div className={`${orderStatisticsStyle.stateReadyOrdersList} text text_type_digits-default`}>
                        {lastReadyOrders?.map(elem=>(
                            <div key={elem}>{fillEmptySpacesZeros(elem, 6)}</div>
                        ))}
                    </div>
                </div>
                <div className={orderStatisticsStyle.inWork}>
                    <div className="text text_type_main-medium mb-6">
                        В работе:
                    </div>
                    <div className={`${orderStatisticsStyle.stateInWorkOrdersList} text text_type_digits-default`}>
                        {lastInWordOrders?.map(elem=>(
                            <div key={elem}>{fillEmptySpacesZeros(elem, 6)}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={orderStatisticsStyle.completedTotal}>
                <div className="text text_type_main-medium">
                    Выполнено за все время:
                </div>
                <div className={`${orderStatisticsStyle.numbersShadow} text_type_digits-large`}>
                    {ordersInfo?.total}
                </div>
            </div>
            <div className={orderStatisticsStyle.completedToday}>
                <div className="text text_type_main-medium">
                    Выполнено за сегодня:
                </div>
                <div className={`${orderStatisticsStyle.numbersShadow} text_type_digits-large`}>
                    {ordersInfo?.totalToday}
                </div>
            </div>

        </div>
    )
}