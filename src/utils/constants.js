import { getCookie } from "./utility-function";

export const spaceFromBlockToTop = 240;
export const apiUrl = 'https://norma.nomoreparties.space/api/'
export const expires = 20 * 60
export const cookie = getCookie()

export const onlyAuth = 'auth'
export const onlyGuest = 'guest'

export const wsUrl = 'wss://norma.nomoreparties.space/orders'

export const textProfile = 'В этом разделе вы можете изменить свои персональные данные'
export const textProfileOrders = 'В этом разделе вы можете просмотреть свою историю заказов'