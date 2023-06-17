import React, { useRef } from 'react';
import elementWrapperStyle from './element-wrapper.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { swapIngredient } from '../../../services/constructor/reducer';
import { INGREDIENT_TYPE_BUN } from '../../../utils/consts';
import { ingredientPropType } from '../../../utils/prop-types';

function ElementWrapper(props){
    const ingredient = props.ingredient;
    const ref = useRef();
    const dispatch = useDispatch();
    const [{}, drop] = useDrop({
        accept: "constructorIngredient",
        hover: (item, monitor)=>{
            const dragKey = item.key;
            const hoverKey = ingredient?.key;
            if(dragKey === hoverKey) return;
            if(ingredient.type === INGREDIENT_TYPE_BUN) return;
            dispatch(swapIngredient({dragKey, hoverKey}))
        },
    })

    const [{}, drag] = useDrag({
        type: "constructorIngredient",
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
                            <DragIcon/>
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

ElementWrapper.propTypes = {
    ingredient: ingredientPropType.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(["top", "bottom", null]),
    isLocked: PropTypes.bool,
    handleClose: PropTypes.func
}