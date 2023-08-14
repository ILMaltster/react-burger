import {TOrderHistoryItem, TOrderStatus, TWSOrderHistoryData} from "../types";

export const generalHistoryItem: TOrderHistoryItem = {
    _id: "64d5235f82e277001bfa8463",
    ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e"
    ],
    status: TOrderStatus.DONE,
    name: " Био-марсианский люминесцентный краторный бургер",
    createdAt: "2023-08-10T17:50:23.121Z",
    updatedAt: "2023-08-10T17:50:23.306Z",
    number: 16373
}


export const generalHistoryData: TWSOrderHistoryData = {
    orders: [generalHistoryItem],
    total: 123,
    totalToday: 1234,
}
