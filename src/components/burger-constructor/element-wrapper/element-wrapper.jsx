import React from 'react';
import elementWrapperStyle from './element-wrapper.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function ElementWrapper(props){
    return(
        <div style={{display: "flex"}} className={props.className}>
            <div className={`${elementWrapperStyle.dragIcon}`}>
                {
                    (props?.type !== 'top' && props?.type !== 'bottom') &&
                    <DragIcon/>
                }
            </div>
            <ConstructorElement {...props}/>
        </div>
    )
}

ElementWrapper.propType = {
    className: PropTypes.string,
    type: PropTypes.oneOf(["top, bottom"]),
}