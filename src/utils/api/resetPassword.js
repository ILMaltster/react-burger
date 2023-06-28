import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";

export default function resetPassword(resetData){
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(resetData)
    }
    return fetch(`${SERVER_ADDRESS}/api/password-reset/reset`, options).then(checkResponse);
}