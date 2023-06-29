import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";

export default function forgotPassword(formData){
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData)
    }
    return fetch(`${SERVER_ADDRESS}/api/password-reset`, options).then(checkResponse);
}