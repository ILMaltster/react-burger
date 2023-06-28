import checkResponse from "../checkResponse"
import { SERVER_ADDRESS } from "../consts";
import fetchWithRefresh from "../fetchWithRefresh";

export default function getUser(){
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
        }
    }
    return fetchWithRefresh(`${SERVER_ADDRESS}/api/auth/user`, options)
} 