export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'

export function getItems() {
    return function(dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        })
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => {return checkResponse(res)})
            .then(data => {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ITEMS_FAILED,
                })
            });
    }
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}