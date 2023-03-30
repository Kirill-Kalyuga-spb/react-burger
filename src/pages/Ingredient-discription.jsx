import React from "react";
import { useParams } from "react-router-dom";
import ModalIngr from "../components/ModalIngr/ModalIngr";
import styles from "./Ingredient-discription.module.css"


export default function IngredientDescription({data}) {
    const { id } = useParams()
    data.forEach(element => {
        if (element._id === id) {
            data = element
        }
    })


    return (
        <div className={styles.container}>
            <ModalIngr data={data} ingrPage={true}/>
        </div>
    )
}