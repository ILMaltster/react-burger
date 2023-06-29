import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";

export default function sendOrder(idsListForOrder){
    const options = {
        method: "POST",
        body: JSON.stringify({ingredients: idsListForOrder}),
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken'),
        },
    }
    return fetch(`${SERVER_ADDRESS}/api/orders`, options).then(checkResponse);
}