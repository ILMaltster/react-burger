import { SERVER_ADDRESS } from "../consts";
import {TLoginData} from "../types";
import request from "../request";

export default function login(authData: TLoginData): Promise<TLoginData>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authData)
    }
    return request<TLoginData>(`${SERVER_ADDRESS}/api/auth/login`, options);
} 