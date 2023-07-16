import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";
import {TLoginData} from "../types";

export default function login(authData: TLoginData): Promise<TLoginData>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authData)
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/login`, options).then(checkResponse<TLoginData>)
} 