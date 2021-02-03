import * as actionTypes from '../actions/actionTypes'

 let initialState = []

if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')){
        initialState = JSON.parse(localStorage.getItem('cart'))
    }else{
        initialState=[]
    }
}

const Cart = (state = initialState,action)=>{
    switch(action.types) {
        case actionTypes.ADD_TO_CART:
            return action.payload

        default:
            return state
    }
}

export default Cart