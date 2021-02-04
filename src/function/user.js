import axios from 'axios'

export const usercart = async (cart,authtoken) => await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart},{
    headers:{
        authtoken
    }
})

export const getcart = async (authtoken) => await axios.get(`${process.env.REACT_APP_API}/getcart`,{
    headers:{
        authtoken
    }
})

export const emptycart = async (authtoken) => await axios.delete(`${process.env.REACT_APP_API}/user/cart`,{
    headers:{
        authtoken
    }
})

export const saveaddress = async (address,authtoken) => await axios.post(`${process.env.REACT_APP_API}/user/saveaddress`,{address},{
    headers:{
        authtoken
    }
})