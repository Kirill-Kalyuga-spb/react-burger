import stylesModalOrder from './ModalOrder.module.css';
import orderImg from './../../images/graphics.svg'
import { useSelector } from "../../hooks/hooks";

export default function ModalOrder() {
    const {orderId} = useSelector(state => state.cart)
    const {orderSuccess, orderFailed} = useSelector(state => state.cart)
    
    return (
        <>
            {orderSuccess ? (<>
            <h2 className={`${stylesModalOrder.text} text text_type_digits-large mt-30`}>{orderId}</h2>
            <h3 className={`${stylesModalOrder.text} text text_type_main-medium mt-8`}>идентификатор заказа</h3>
            <img className={`${stylesModalOrder.img} mt-15`} src={orderImg} />
            <p className={`${stylesModalOrder.text} text text_type_main-default mt-15`}>ваш заказ начали готовить</p>
            <p className={`${stylesModalOrder.text} text text_type_main-default text_color_inactive mt-2 mb-30`}>дождитесь готовности на орбитальной станции</p>
            </>)
            : orderFailed ? <p className='text text_type_main-medium'>error{' : ('}</p> 
            : <p className='text text_type_main-medium'>loading...</p>}
        </>
    )
}