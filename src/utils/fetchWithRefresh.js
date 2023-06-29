import refreshToken from "./api/refreshToken";
import checkResponse from "./checkResponse";
const fetchWithRefresh = async(url, options)=>{
    try{
        return await fetch(url, options).then(checkResponse);
    }
    catch(err){
        if(err.message === 'jwt expired'){
            const refreshData = await refreshToken();
            if(!refreshData.success){
                Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return await fetch(url, options).then(checkResponse);
        }
        else{
            Promise.reject(err);
        }
    }

}
export default fetchWithRefresh;