import axios from 'axios'

export  const getCategories = async () => await axios.get(`${process.env.REACT_APP_API}/categories`)

export const getCategory = async (slug) => 
     await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)


export const createCategory = async (name,token) => 
     await axios.post(`${process.env.REACT_APP_API}/category`,name,{
        headers:{
            authtoken: token
        }
    })


export const removeCategory = async(slug,token) => 
     await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers: {
            authtoken: token
        }
    })


export const updateCategory = async(name,slug,token) => 
     await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,
        name,{
        headers: {
            authtoken: token
        }
    })

export const getCategorySubs = async (_id) => 
 await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`)