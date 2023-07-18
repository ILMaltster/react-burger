import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus} from "../types";
import request from "../request";

interface IRefreshTokenResponse extends IResponseStatus{
    accessToken: string;
    refreshToken: string;
}

const refreshToken = ()=>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: localStorage.getItem('accessToken') as string,
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    }

    return request<IRefreshTokenResponse>(`${SERVER_ADDRESS}/api/auth/token`, options);
}
export default refreshToken;