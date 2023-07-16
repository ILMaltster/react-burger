import refreshToken from "./api/refreshToken";
import checkResponse from "./checkResponse";


export default async function fetchWithRefresh<T>(url: string, options: RequestInit): Promise<T>{
    try{
        return fetch(url, options).then(checkResponse<T>);
    }
    catch(err: any){
        if(err.message === 'jwt expired'){
            const refreshData = await refreshToken();
            if(!refreshData.success){
                await Promise.reject<T>(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            (options.headers as Headers).set("authorization", refreshData.accessToken);
            return fetch(url, options).then(checkResponse<T>);
        }
        else{
            return await Promise.reject<T>(err);
        }
    }
}