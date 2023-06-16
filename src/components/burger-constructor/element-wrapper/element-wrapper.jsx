import React, { useRef } from 'react';
import elementWrapperStyle from './element-wrapper.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { swapIngredient } from '../../../services/constructor/reducer';
import { INGREDIENT_TYPE_BUN } from '../../../utils/consts';

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

    const [{border}, drag, preview] = useDrag({
        type: "constructorIngredient",
        item: ingredient,
    })

    const img = new Image();
    img.src = ingredient.image;
    preview(img);

    return(
        <>
            <DragPreviewImage connect={preview} src={ingredient.image}/>
            <div ref={drop} style={{display: "flex", border}} className={props.className}>
                <div className={`${elementWrapperStyle.dragIcon}`}>
                    {
                        (props.type !== 'top' && props.type !== 'bottom') &&
                        <div ref={drag}>
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
    ingredient: PropTypes.shape(
    {
        "key": PropTypes.number,
        "_id": PropTypes.string.isRequired,
        "name":PropTypes.string.isRequired,
        "type":PropTypes.string.isRequired,
        "proteins":PropTypes.number.isRequired,
        "fat":PropTypes.number.isRequired,
        "carbohydrates":PropTypes.number.isRequired,
        "calories":PropTypes.number.isRequired,
        "price":PropTypes.number.isRequired,
        "image":PropTypes.string.isRequired,
        "image_mobile":PropTypes.string.isRequired,
        "image_large":PropTypes.string.isRequired,
        "__v":PropTypes.number.isRequired
    }
    ).isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(["top", "bottom", null]),
    isLocked: PropTypes.bool,
    handleClose: PropTypes.func
}