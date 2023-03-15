export const spaceFromBlockToTop = 240;
export const apiUrl = 'https://norma.nomoreparties.space/api/'

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}