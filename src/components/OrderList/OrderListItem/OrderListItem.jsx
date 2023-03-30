import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import OrderInfo from '../../../pages/OrderInfo'
import Modal from '../../Modal/Modal'
import styles from './OrderListItem.module.css'

export default function OrderListItem ({data}) {
    const { id } = useParams();
    const navigate = useNavigate()
    const {_id, ingredients, status, name, number, createdAt, updatedAt} = data
    const items = useSelector(state => state.items.items.data)
    const path = useLocation().pathname.split('/')[1]
    const color = status == 'created' ? 'white' : status == 'done' ? '#00CCCC' : 'red'
    const word = status == 'created' ? 'Готовится' : status == 'done' ? 'Выполнен' : 'Отменён'
   
    const ingrsData = ingredients.map((id) => (
        items.find(item => item._id == id)
    )).filter((item) => item !== undefined)
  
    const prices = ingrsData.reduce((acc, item) => (acc += item.price), 0) 
    const dataImg = ingrsData.map((ingr) => (
        ingr.image
    ))

    const [state, setState] = useState({visible: Boolean(id == data._id && id != undefined ) })
    
    const handlerOpenModal = () => {
        setState({visible: true})
    }

    const handlerCloseModal = () => {
        setState({visible: false})
    }

    const modal = (<Modal exit={handlerCloseModal} ><OrderInfo></OrderInfo></Modal>)

    useEffect(() => {
        if (!state.visible && id == data._id) {
            path == 'feed' ? navigate('/feed') : navigate('/profile/orders')
        }    
    }, [state])

    return (
        <>
        <li className={`mb-6 ${styles.listItem} p-6`} key={_id} onClick={handlerOpenModal}>
            <Link to={path == 'feed' ? `/feed/${_id}` : `/profile/orders/${_id}`} state={{otherPath: true}} className={styles.link} >
            <div className={styles.div}>
                <p className=" text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(createdAt)} /></p>
            </div>
            <h2 className="text text_type_main-medium mt-6">{name}</h2>
            <p className="text text_type_main-default mt-2" style={{color: color}} >{word}</p>
            <div className={`${styles.div} mt-6`}>
                <div className={styles.div1}>
                    {dataImg.map((item, index, arr) => {
                        if (index > 5) {return null}
                        if (index === 5) {
                            return (
                            <div className={styles.rel} style={{ zIndex: dataImg.length - index }} key={index}>
                                <p className={`${styles.cover}` + " text text_type_digits-default"}>+{arr.length - index}</p>
                                <img src={item} alt='ингредиент' className={styles.img} />
                            </div>)
                        }
                       return (<img src={item} alt='ингредиент' key={index} className={styles.img} style={{zIndex: dataImg.length - index}} />)
                        })}
                </div>
                <div className={styles.divPrice}>
                    <p className={`${styles.p} text text_type_digits-default mr-2`}>{prices} </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
            </Link>
        </li>
        {state.visible && modal}
        </>
    )
}