import orderFeedStyle from './order-feed.module.css';
import OrdersList from "../../components/orders-list";
import OrdersStatistics from "../../components/orders-statistics";
import {useSelector} from "react-redux";

export default function OrderFeedPage(){

    // @ts-ignore
    const ingredients = useSelector(store => store.allIngredients.data);
    return(
        <div>
            <div className="text text_type_main-medium mb-5">Лента заказов</div>
            <div className={orderFeedStyle.container}>
                <OrdersList orderList={[ingredients, ingredients, ingredients]}/>
                <OrdersStatistics/>
            </div>
        </div>
    )
}