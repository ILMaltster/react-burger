import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus, TIdsListData} from "../types";

interface ISendOrderResponse extends IResponseStatus{
    name: string;
    order: {
        number: number;
    }
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
    return fetch(`${SERVER_ADDRESS}/api/orders`, options).then(checkResponse<ISendOrderResponse>);
}