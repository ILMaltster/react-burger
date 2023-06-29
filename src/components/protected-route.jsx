import {useLocation, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({isOnlyUnAuth = false, component}){
    
    const isAuthChecked = useSelector(store=> store.user.isAuthChecked)
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

export const OnlyUnAuthRoute = ({component})=>(
    <ProtectedRoute isOnlyUnAuth={true} component={component}/>
);

ProtectedRoute.propTypes = {
    isOnlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired
}

OnlyAuthRoute.propTypes = {
    isOnlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired
}

OnlyUnAuthRoute.propTypes = {
    component: PropTypes.element.isRequired
}