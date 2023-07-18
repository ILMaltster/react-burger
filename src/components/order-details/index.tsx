import orderDetailsStyle from './order-details.module.css'
import fillEmptySpacesZeros from "../../utils/fillEmptySpacesZeros";
import React from "react";


export default function OrderDetails(): React.ReactElement{
    return(
        <div>
            <div className={`${orderDetailsStyle.number}`}>
                #{fillEmptySpacesZeros(23, 6)}
            </div>
            <div className={"text"}>

            </div>
            <div className={orderDetailsStyle.status}>

            </div>
            <div className={"text"}></div>
            <div className={orderDetailsStyle.structureContainer}>

            </div>
            <div className={orderDetailsStyle.someInfo}>
                <div className={"text"}></div>
                <div className={orderDetailsStyle}>

                </div>
            </div>
        </div>
    )
}