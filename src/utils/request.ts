import checkResponse from "./checkResponse";

export default function request<T>(url: RequestInfo, options?:RequestInit): Promise<T>{
    return fetch(url, options).then(checkResponse<T>)
}