import axios from 'axios'

export const usercart = async (cart,authtoken) => await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart},{
    headers:{
        authtoken
    }
})