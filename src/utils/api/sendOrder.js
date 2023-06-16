import checkResponseAndReturnPromiseJson from "../checkResponseAndReturnPromiseJson";
import { SERVER_ADDRESS } from "../consts";

export default function sendOrder(idsListForOrder){
    const options = {
        method: "POST",
        body: JSON.stringify({ingredients: idsListForOrder}),
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(`${SERVER_ADDRESS}/api/orders`, options).then(checkResponseAndReturnPromiseJson);
}