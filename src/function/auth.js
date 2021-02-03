import axios from 'axios'

export  const createorupdate = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update`,{},{
         headers: {
             authToken: token
         }
     })
 }

 export  const currentuser = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/currentuser`,{},{
         headers: {
             authToken: token
         }
     })
 }

 export const currentAdmin = async (token) => {
     return await axios.post(`${process.env.REACT_APP_API}/current-admin`,{},{
         headers:{
             authToken: token
         }
     })
 }