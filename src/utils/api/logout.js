import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";

export default function logout(){
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({token: localStorage.getItem("refreshToken")})
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/logout`, options).then(checkResponse)
} 