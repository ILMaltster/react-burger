import { SERVER_ADDRESS } from "../consts";
import {IRegisterResponse, IUserCredentials} from "../types";
import request from "../request";

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