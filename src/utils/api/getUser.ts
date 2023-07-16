import { SERVER_ADDRESS } from "../consts";
import fetchWithRefresh from "../fetchWithRefresh";
import {IGetUserResponse} from "../types";

export default function getUser(): Promise<IGetUserResponse>{
    const options: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken') as string,
        }
    }
    return fetchWithRefresh<IGetUserResponse>(`${SERVER_ADDRESS}/api/auth/user`, options)
} 