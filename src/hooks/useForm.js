import {useState} from 'react'

export function useForm(initialInputValues){
    const [values, setValues] = useState(initialInputValues);

    const handleChange = (event)=>{
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return [values, handleChange, setValues]
}