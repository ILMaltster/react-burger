import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus} from "../types";
import request from "../request";

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
    return request<ILogoutResponse>(`${SERVER_ADDRESS}/api/auth/logout`, options);
} 