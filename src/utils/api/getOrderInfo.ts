import { SERVER_ADDRESS } from "../consts";
import fetchWithRefresh from "../fetchWithRefresh";
import {TSelectedOrder} from "../types";

export default function getOrderInfo(number: number): Promise<TSelectedOrder>{
    const options: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    }
    return fetchWithRefresh<TSelectedOrder>(`${SERVER_ADDRESS}/api/orders/${number}`, options)
} 