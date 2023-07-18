import { SERVER_ADDRESS } from "../consts";
import {TForgotPasswordData, IResponseStatus} from "../types";
import request from "../request";

interface IForgotPasswordResponse extends IResponseStatus{
    message: string;
}

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