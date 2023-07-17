import refreshToken from "./api/refreshToken";
import request from "./request";


export default async function fetchWithRefresh<T>(url: string, options: RequestInit): Promise<T>{
    try{
        return request<T>(url, options);
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
            return request<T>(url, options);
        }
        else{
            return await Promise.reject<T>(err);
        }
    }
}