import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRoute'

const UserRoute = ({ children, ...rest }) => {
    const {Auth} = useSelector((state => ({...state})))

    return Auth && Auth.token ? (<Route {...rest} />) : (
        <LoadingToRedirect/>
    )
}

export default UserRoute;