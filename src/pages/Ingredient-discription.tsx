import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalIngr from "../components/ModalIngr/ModalIngr";
import styles from "./Ingredient-discription.module.css";
import {TIngredient} from '../services/types/data'
import { useSelector } from "../hooks/hooks";

export default function IngredientDescription() {
    const { id } = useParams()
    const [elem, SetElem] = useState<any>({})
    const {items}: {items: Array<TIngredient>} = useSelector(state => state.items)
   
    useEffect(() => {
        items.forEach((element:TIngredient) => {
            if (element._id === id) {
                SetElem(element)
            }
        })
    },[items])


    return (
        <div className={styles.container}>
            <ModalIngr data={elem} ingrPage={true}/>
        </div>
    )
}