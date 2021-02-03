import axios from 'axios'

export  const getSubs = async () => await axios.get(`${process.env.REACT_APP_API}/subs`)

export const getSub = async (slug) => 
     await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)


export const createSub = async (name,token) => 
     await axios.post(`${process.env.REACT_APP_API}/sub`,name,{
        headers:{
            authtoken: token
        }
    })


export const removeSub = async(slug,token) => 
     await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers: {
            authtoken: token
        }
    })


export const updateSub = async(slug,name,token) => 
     await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,
        name,{
        headers: {
            authtoken: token
        }
    })
