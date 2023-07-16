import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus, IUserCredentials} from "../types";

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
    return fetch(`${SERVER_ADDRESS}/api/auth/register`, options).then(checkResponse<IRegisterResponse>)
} 