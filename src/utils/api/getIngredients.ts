import checkResponse from "../checkResponse";
import { SERVER_ADDRESS } from "../consts";
import {IIngredient, IResponseStatus} from "../types";

interface IGetIngredientsResponse extends IResponseStatus{
    data: Array<IIngredient>
}

export default function getIngredients(): Promise<Array<IIngredient>>{
    return fetch(`${SERVER_ADDRESS}/api/ingredients`).then(checkResponse<IGetIngredientsResponse>).then(data => data.data);
}