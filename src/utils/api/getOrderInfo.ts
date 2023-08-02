import { SERVER_ADDRESS } from "../consts";
import fetchWithRefresh from "../fetchWithRefresh";
import {IGetUserResponse} from "../types";

export default function getOrderInfo(number: number): Promise<IGetUserResponse>{
    const options: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    }
    return fetchWithRefresh<IGetUserResponse>(`${SERVER_ADDRESS}/api/orders/${number}`, options)
} 