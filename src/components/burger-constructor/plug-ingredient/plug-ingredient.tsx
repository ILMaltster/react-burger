import plugIngredient from './plug-ingredient.module.css';
import React from "react";

interface IPlugIngredientProps{
    text: string;
    type?: "top" | "bottom" | "default";
}

export default function PlugIngredient({text, type}: IPlugIngredientProps): React.ReactElement{
    const styleWrapper = ()=>{
        if(type === "top") 
            return {borderRadius: "88px 88px 44px 44px"};
        if(type === "bottom") 
            return {borderRadius: "44px 44px 88px 88px"};
        else
            return {borderRadius: "44px 44px 44px 44px", height: "100%"};
    }
    
    return(
        <div className={`${plugIngredient.wrapper} text text_type_main-medium`} 
            style={styleWrapper()}
        >
            {text}
        </div>
    )
}