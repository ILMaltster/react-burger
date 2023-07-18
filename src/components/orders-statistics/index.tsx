import orderStatisticsStyle from './order-statistics.module.css';
import fillEmptySpacesZeros from "../../utils/fillEmptySpacesZeros";

export default function OrdersStatistics(){

    const fakeReadyOrders = [
        2, 3, 34533, 8
    ]
    const fakeInWorkOrders = [
        7, 9, 3343, 342343
    ]

    return(
        <div className={orderStatisticsStyle.container}>
            <div className={orderStatisticsStyle.ordersStates}>
                <div className={orderStatisticsStyle.stateReady}>
                    <div className="text text_type_main-medium mb-6">
                        Готовы
                    </div>
                    <div className={`${orderStatisticsStyle.stateReadyOrdersList} text text_type_digits-default`}>
                        {fakeReadyOrders.map(elem=>(
                            <div>{fillEmptySpacesZeros(elem, 6)}</div>
                        ))}
                    </div>
                </div>
                <div className={orderStatisticsStyle.inWork}>
                    <div className="text text_type_main-medium mb-6">
                        В работе:
                    </div>
                    <div className={`${orderStatisticsStyle.stateInWorkOrdersList} text text_type_digits-default`}>
                        {fakeInWorkOrders.map(elem=>(
                            <div>{fillEmptySpacesZeros(elem, 6)}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={orderStatisticsStyle.completedTotal}>
                <div className="text text_type_main-medium">
                    Выполнено за все время:
                </div>
                <div className={`${orderStatisticsStyle.numbersShadow} text_type_digits-large`}>
                    28752
                </div>
            </div>
            <div className={orderStatisticsStyle.completedToday}>
                <div className="text text_type_main-medium">
                    Выполнено за сегодня:
                </div>
                <div className={`${orderStatisticsStyle.numbersShadow} text_type_digits-large`}>
                    2312
                </div>
            </div>

        </div>
    )
}