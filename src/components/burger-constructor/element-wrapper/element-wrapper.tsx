import React, { useRef } from 'react';
import elementWrapperStyle from './element-wrapper.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { swapIngredient } from '../../../services/constructor/reducer';
import {CONSTRUCTOR_INGREDIENTS, INGREDIENT_TYPE_BUN} from '../../../utils/consts';
import {IIngredientWithKey, TUseDropConstuctor} from "../../../utils/types";

interface IElementWrapper {
    ingredient: IIngredientWithKey;
    type?: "top" | "bottom" | undefined;
    className?: string;
    handleClose?: ()=>void;
    isLocked?: boolean;
}

function ElementWrapper(props: IElementWrapper): React.ReactElement{
    const ingredient = props.ingredient;
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [, drop] = useDrop<TUseDropConstuctor, undefined, undefined>({
        accept: CONSTRUCTOR_INGREDIENTS,
        hover: (item)=>{
            const dragKey = item.key;
            const hoverKey = ingredient?.key;
            if(dragKey === hoverKey) return;
            if(ingredient.type === INGREDIENT_TYPE_BUN) return;
            dispatch(swapIngredient({dragKey, hoverKey}))
        },
    })

    const [, drag] = useDrag({
        type: CONSTRUCTOR_INGREDIENTS,
        item: ingredient,
        
    })
    
    drag(drop(ref));
    return(
        <>
            <div ref={ref} style={{display: "flex"}} className={props.className}>
                <div className={`${elementWrapperStyle.dragIcon}`}>
                    {
                        (props.type !== 'top' && props.type !== 'bottom') &&
                        <div>
                            <DragIcon type="primary"/>
                        </div>
                    }
                </div>
                <ConstructorElement 
                    thumbnail={ingredient.image}
                    price={ingredient.price} 
                    isLocked={props.isLocked} 
                    type={props.type}
                    handleClose={props.handleClose}
                    text={ingredient.name}
                />
            </div>
        </>
    )
}

export default React.memo(ElementWrapper);