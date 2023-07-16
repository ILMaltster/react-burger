import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";
import {IResponseStatus, TResetPasswordData} from "../types";

interface IResetPasswordResponse extends IResponseStatus{
    message: string;
}

export default function resetPassword(resetData: TResetPasswordData): Promise<IResetPasswordResponse>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(resetData)
    }
    return fetch(`${SERVER_ADDRESS}/api/password-reset/reset`, options).then(checkResponse<IResetPasswordResponse>);
}