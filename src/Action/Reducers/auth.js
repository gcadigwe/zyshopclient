
import * as actionTypes from '../actions/actionTypes'


const Auth = (state=null,action) =>{
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return action.payload
        case actionTypes.LOGOUT_USER:
            return action.payload

        default:
            return state;
    }
}


export default Auth;