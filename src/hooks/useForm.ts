import React, {useState} from 'react'

type TUseFormReturned<T> = [
    value: T,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    setValues: React.Dispatch<React.SetStateAction<T>>
]

export function useForm<T>(initialInputValues: T): TUseFormReturned<T> {
    const [values, setValues] = useState<T>(initialInputValues);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void{
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    }
    return [values, handleChange, setValues]
}