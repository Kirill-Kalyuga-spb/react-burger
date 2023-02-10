import { ADD_INGR, ADD_BUN, MOVE_INGR, REMOVE_INGR } from "../actions/cart"


const initialState = {
    ingr: [
        {
            "_id": "60d3b41abdacab0026a733cc",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            "__v": 0
          },
          {
            "_id": "60d3b41abdacab0026a733c8",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
          },
          {
            "_id":"60d3b41abdacab0026a733d0",
            "name":"Хрустящие минеральные кольца",
            "type":"main",
            "proteins":808,
            "fat":689,
            "carbohydrates":609,
            "calories":986,
            "price":300,
            "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
            "__v":0
           },
          {
            "_id":"60d3b41abdacab0026a733c9",
            "name":"Мясо бессмертных моллюсков Protostomia",
            "type":"main",
            "proteins":433,
            "fat":244,
            "carbohydrates":33,
            "calories":420,
            "price":1337,
            "image":"https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v":0
           },
           {
            "_id":"60d3b41abdacab0026a733cf",
            "name":"Соус с шипами Антарианского плоскоходца",
            "type":"sauce",
            "proteins":101,
            "fat":99,
            "carbohydrates":100,
            "calories":100,
            "price":88,
            "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
            "__v":0
           },
           {
            "_id":"60d3b41abdacab0026a733ca",
            "name":"Говяжий метеорит (отбивная)",
            "type":"main",
            "proteins":800,
            "fat":800,
            "carbohydrates":300,
            "calories":2674,
            "price":3000,
            "image":"https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v":0
           }
    ],
    bun: {
        "_id": "60d3b41abdacab0026a733c7",
        "name": "Флюоресцентная булка R2-D3",
        "type": "bun",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
        "__v": 0
    }
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGR: {
            return {
                ...state,
                ingr: [...state.ingr, action.ingr]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingr
            }
        }
        case MOVE_INGR: {
            
            const indexItem = action.item.index;
            const indexDrop = action.indexDrop;
            
            if (indexItem > indexDrop) {
                return {
                    ...state,
                    ingr: [
                        ...state.ingr
                            .slice(0, indexDrop),
                        state.ingr[indexItem],
                        ...state.ingr
                            .slice(indexDrop, indexItem),
                        ...state.ingr
                            .slice(indexItem + 1)
                    ]
                }
            } else {
                return {
                    ...state,
                    ingr: [
                        ...state.ingr
                            .slice(0, indexItem),
                        ...state.ingr
                            .slice(indexItem + 1, indexDrop + 1),
                        state.ingr[indexItem],
                        ...state.ingr
                            .slice(indexDrop + 1)
                    ]
                }
            }
        }
        case REMOVE_INGR: {
            return {
                ...state,
                ingr: [...state.ingr.filter(item => item._id !== action.item._id)]
            }
        }
        default: {
            return state
        }
    }
}