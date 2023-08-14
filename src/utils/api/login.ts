import { SERVER_ADDRESS } from "../consts";
import {TLoginDataWithTokenResponse, TLoginFormData} from "../types";
import request from "../request";

export default function login(authData: TLoginFormData): Promise<TLoginDataWithTokenResponse>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authData)
    }
    return request<TLoginDataWithTokenResponse>(`${SERVER_ADDRESS}/api/auth/login`, options);
} 