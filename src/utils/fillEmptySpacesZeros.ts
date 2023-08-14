export default function fillEmptySpacesZeros(number: number | string, maxLenght: number) : string{
    return String(number).padStart(maxLenght, '0');
}