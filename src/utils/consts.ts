export const SERVER_ADDRESS = "https://norma.nomoreparties.space";
export const WS_SERVER_ADDRESS_OWN_ORDERS = "wss://norma.nomoreparties.space/orders";
export const WS_SERVER_ADDRESS_GENERAL_ORDERS = "wss://norma.nomoreparties.space/orders/all";

export const CONSTRUCTOR_INGREDIENTS = "constructorIngredient";

export const BUNS = "Булки";
export const SAUCE = "Соусы";
export const MAINS = "Начинки";

export enum INGREDIENT_TYPES {
    BUN = "bun",
    SAUCE = "sauce",
    MAIN = "main",
}

export let INGREDIENT_TYPE_BUN = "bun";
export let INGREDIENT_TYPE_SAUCE = "sauce";
export let INGREDIENT_TYPE_MAIN = "main";

export const PROFILE_TAB_DESCRIPTION_PROFILE = "В этом разделе вы можете изменить свои персональные данные"
export const PROFILE_TAB_DESCRIPTION_ORDER_HISTORY = "Здесь находится история ваших заказов";

export const FORGOT_PASSWORD_FLAG = "forgotPasswordRequestSended";

export enum ORDER_STATUS{
    NONE,
    CREATED,
    COOKING,
    READY
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}