import burgerConstructorStyle from './burger-constructor.module.css';
import ElementWrapper from './element-wrapper/element-wrapper';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor(){
    return(
        <div className={`${burgerConstructorStyle.constructorStyle}`}>
            <div className={`${burgerConstructorStyle.containerWrapper} mt-25`}>
                <ElementWrapper className="mb-4 pr-4" type='top' text="Краторная булка N-200i" price={200} isLocked={true} thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"/>
                
                <div className={`${burgerConstructorStyle.container} custom-scroll pr-4`}>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    <ElementWrapper price={200} text="Хрустящие минеральные кольца" thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                </div>
                
                <ElementWrapper  className="mt-4 pr-4" type='bottom' text="Краторная булка N-200i" price={200} isLocked={true} thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"/>
            </div>
            <div className={`${burgerConstructorStyle.submit} mt-10`}>
                <Button size="large">Оформить заказ</Button>
                <div className={`${burgerConstructorStyle.currency} text text_type_digits-medium mr-10`}>
                    <div className='mr-2'>610</div>
                    <CurrencyIcon/>
                </div>
            </div>
        </div>
    )
}
