import {TOrderStatus} from "../../utils/types";
import orderItemStyle from "../../components/orders-item/order-item.module.css";
import React from "react";

interface IGetStatusData {
    isGlobalOrderFeed: boolean;
    status: TOrderStatus;
}

const GetStatusTitle = React.memo(({isGlobalOrderFeed, status}: IGetStatusData) => {
    const defText = "text text_type_main-small mt-2";

    if(isGlobalOrderFeed) return (<></>);

    switch (status){
        case TOrderStatus.CREATED:
            return (
                <div className={defText}>
                    Создан
                </div>
            )
        case TOrderStatus.PENDING:
            return (
                <div className={defText}>
                    Готовится
                </div>
            )
        case TOrderStatus.DONE:
            return (
                <div className={`${defText} ${orderItemStyle.statusReady}`}>
                    Выполнен
                </div>
            )
        default:
            return <></>
    }
})

export default GetStatusTitle;