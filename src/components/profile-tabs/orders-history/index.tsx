import orderHistoryStyle from './orders-history.module.css';
import OrdersList from "../../orders-list";
import {useSelector} from "react-redux";

export default function OrdersHistory(){
    // @ts-ignore
    const ingredients = useSelector(store => store.allIngredients.data);
    return(
        <div className={`${orderHistoryStyle.container} mt-10`}>
            <OrdersList orderList={[ingredients, ingredients, ingredients, ingredients]}/>
        </div>
    )
}