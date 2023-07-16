import {useLocation, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

type TProtectedRoute = {
    isOnlyUnAuth?: boolean;
    component: React.ReactElement;
}

function ProtectedRoute({isOnlyUnAuth = false, component}: TProtectedRoute): React.ReactElement | null{
    
    // @ts-ignore
    const isAuthChecked = useSelector(store=> store.user.isAuthChecked);
    // @ts-ignore
    const user = useSelector((store) => store.user.user);
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