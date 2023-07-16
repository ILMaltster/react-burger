import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus} from "../types";

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

    return fetch(`${SERVER_ADDRESS}/api/auth/token`, options)
        .then(checkResponse<IRefreshTokenResponse>)
} 
export default refreshToken;