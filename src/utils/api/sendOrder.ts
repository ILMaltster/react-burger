import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus, TIdsListData, TReadyOrder} from "../types";
import request from "../request";

export interface ISendOrderResponse extends IResponseStatus{
    name: string;
    order: TReadyOrder;
}

export default function sendOrder(idsListForOrder: TIdsListData): Promise<ISendOrderResponse>{
    const options = {
        method: "POST",
        body: JSON.stringify({ingredients: idsListForOrder}),
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken') as string,
        },
    }
    return request<ISendOrderResponse>(`${SERVER_ADDRESS}/api/orders`, options);
}