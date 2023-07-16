import { SERVER_ADDRESS } from "../consts";
import fetchWithRefresh from "../fetchWithRefresh";
import {IGetUserResponse, TUpdateUserCredentialsData} from "../types";

export default function patchUser(newUserData: TUpdateUserCredentialsData): Promise<IGetUserResponse>{
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken') as string,
        },
        body: JSON.stringify(newUserData)
    }
    return fetchWithRefresh<IGetUserResponse>(`${SERVER_ADDRESS}/api/auth/user`, options);
} 