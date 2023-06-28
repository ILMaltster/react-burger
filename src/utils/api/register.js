import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";

export default function register(authData){
    console.log(JSON.stringify(authData));
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authData)
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/register`, options).then(checkResponse)
} 