export type TUser = {
    email: string;
    password: string;
    name?: string;
};

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    uuid?: string;
    __v?: number;
    _id: string;
};

export type TToken = {
    refreshToken?: string;
    accessToken?: string;
};