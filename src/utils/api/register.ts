import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus, IUserCredentials} from "../types";
import request from "../request";

interface IRegisterResponse extends IResponseStatus{
    user:{
        email: string;
        name: string;
    },
    accessToken: string;
    refreshToken: string;
}

export default function register(authData: IUserCredentials) : Promise<IRegisterResponse>{
    console.log(JSON.stringify(authData));
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8' as string,
        },
        body: JSON.stringify(authData)
    }
    return request<IRegisterResponse>(`${SERVER_ADDRESS}/api/auth/register`, options);
} 