import { SERVER_ADDRESS } from "../consts";
import {IResetPasswordResponse, TResetPasswordData} from "../types";
import request from "../request";


export default function resetPassword(resetData: TResetPasswordData): Promise<IResetPasswordResponse>{
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(resetData)
    }
    return request<IResetPasswordResponse>(`${SERVER_ADDRESS}/api/password-reset/reset`, options);
}