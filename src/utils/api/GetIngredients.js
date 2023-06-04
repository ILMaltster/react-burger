import checkResponseAndReturnPromiseJson from "../checkResponseAndReturnPromiseJson";
import { SERVER_ADDRESS } from "../consts";

export default function getIngredients(){
    return fetch(`${SERVER_ADDRESS}/api/ingredients`).then(res=> checkResponseAndReturnPromiseJson(res));
}