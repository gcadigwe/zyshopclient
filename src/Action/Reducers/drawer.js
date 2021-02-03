import * as actionTypes from '../actions/actionTypes'

const drawer = (state = false,action) => {
    switch (action.type) {
        case actionTypes.SET_VISIBLE:
            return action.payload

        default:
            return state;
    }
}

export default drawer