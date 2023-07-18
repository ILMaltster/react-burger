export default function fillEmptySpacesZeros(number:number | string, maxLenght: number){
    return String(number).padStart(maxLenght, '0');
}