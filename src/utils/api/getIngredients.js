import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";

export default function getIngredients(){
    return fetch(`${SERVER_ADDRESS}/api/ingredients`).then(checkResponse).then(data=>data.data);
}