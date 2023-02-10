import React from "react";
import stylesModalIngr from './ModalIngr.module.css';

export default function ModalIngr(props) {

    return (
        <>
            <h2 className={`${stylesModalIngr.h2} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
            <img className={`${stylesModalIngr.img} mb-4`} src={props.data.image_large} />
            <h3 className={`${stylesModalIngr.text} text text_type_main-medium mb-8`}>{props.data.name}</h3>
            <ul className={`${stylesModalIngr.list} mb-15 ml-25 mr-25`} >
                <li className="text text_type_main-default text_color_inactive">Калории,ккал {"\n"}
                    <span className="text text_type_digits-default text_color_inactive">{props.data.calories}</span>
                </li>
                <li className="text text_type_main-default text_color_inactive">ㅤБелки,&nbsp;г ㅤ{"\n"}
                    <span className="text text_type_digits-default text_color_inactive">{props.data.proteins}</span>
                </li>
                <li className="text text_type_main-default text_color_inactive">ㅤЖиры,&nbsp;г ㅤ{"\n"}
                    <span className="text text_type_digits-default text_color_inactive">{props.data.fat}</span>
                </li>
                <li className="text text_type_main-default text_color_inactive">Углеводы,&nbsp;г {"\n"}
                    <span className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</span>
                </li>
            </ul>
        </>
    )
}