import authContainerStyle from './auth-container.module.css';
import PropTypes from 'prop-types'
export default function AuthContainer({children}){
    return(
        <div className={authContainerStyle.container}>
            {children}
        </div>
    )
}

AuthContainer.propTypes = {
    children: PropTypes.any.isRequired
}