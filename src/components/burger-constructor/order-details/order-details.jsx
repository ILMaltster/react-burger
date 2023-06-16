import orderDetailsStyle from './order-details.module.css';
import done from '../../../images/icons/done.svg';
import { useSelector } from 'react-redux';

export default function OrderDetails(){
    const orderStore = useSelector(store => store.order);
    const orderNumber = orderStore.order.order.number;
    return(
        <div className={`${orderDetailsStyle.wrapper}`}>
            <div className={`${orderDetailsStyle.number} text text_type_digits-large mt-8`}>
                {String(orderNumber).padStart(6, '0')}
            </div>
            <div className='text text_type_main-default mt-8'>
                идентификатор заказа
            </div>
            <div className='mt-15'>
                <img src={done} width="120"/>
            </div>
            <div className={`mt-15 text text_type_main-small`}>Ваш заказ начали готовить</div>
            <div className={`mt-2 text text_color_inactive text_type_main-small`}>Дождитесь готовности на орбитальной станции</div>
        </div>
    )
}