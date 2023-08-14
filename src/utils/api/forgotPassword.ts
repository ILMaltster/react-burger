import { SERVER_ADDRESS } from "../consts";
import {TForgotPasswordData, IForgotPasswordResponse} from "../types";
import request from "../request";

export default function forgotPassword(formData: TForgotPasswordData):Promise<IForgotPasswordResponse> {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData)
    }
    return request<IForgotPasswordResponse>(`${SERVER_ADDRESS}/api/password-reset`, options);
}