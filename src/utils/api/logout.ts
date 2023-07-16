import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus} from "../types";

interface ILogoutResponse extends IResponseStatus{
    message: string;
}

export default function logout(): Promise<ILogoutResponse>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken') as string,
        },
        body: JSON.stringify({token: localStorage.getItem("refreshToken")})
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/logout`, options).then(checkResponse<ILogoutResponse>)
} 