import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";

export default function login(authData){
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authData)
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/login`, options).then(checkResponse)
} 