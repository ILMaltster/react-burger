import {useLocation, Navigate} from 'react-router-dom';
import {useAppSelector} from "../hooks/useAppSelector";

type TProtectedRoute = {
    isOnlyUnAuth?: boolean;
    component: React.ReactElement;
}

function ProtectedRoute({isOnlyUnAuth = false, component}: TProtectedRoute): React.ReactElement | null{
    
    const isAuthChecked = useAppSelector(store=> store.user.isAuthChecked);
    const user = useAppSelector((store) => store.user.user);
    const location = useLocation();
    if(!isAuthChecked) return null;

    if(!user && !isOnlyUnAuth){
         return <Navigate to="/login" state={{from: location}} />
    }

    if(user && isOnlyUnAuth){
        const {from} = location.state || {from: {pathname: "/"}}
        return <Navigate to={from}/>
   }

    return component;
}

export const OnlyAuthRoute = ProtectedRoute;

export const OnlyUnAuthRoute = ({component}: Pick<TProtectedRoute, "component">): React.ReactElement => (
    <ProtectedRoute isOnlyUnAuth={true} component={component}/>
);