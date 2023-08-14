import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TRootState} from "../services/store";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;