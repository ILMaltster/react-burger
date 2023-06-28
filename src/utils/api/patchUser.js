import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";

export default function patchUser(newUserData){
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(newUserData)
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/user`, options).then(checkResponse)
} 