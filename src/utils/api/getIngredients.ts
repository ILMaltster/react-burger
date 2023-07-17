import { SERVER_ADDRESS } from "../consts";
import {IIngredient, IResponseStatus} from "../types";
import request from "../request";

interface IGetIngredientsResponse extends IResponseStatus{
    data: Array<IIngredient>
}

export default function getIngredients(): Promise<Array<IIngredient>>{
    return request<IGetIngredientsResponse>(`${SERVER_ADDRESS}/api/ingredients`)
        .then(data => data.data);
}