import axios from 'axios'


export const createProduct = async (product,token) => 
     await axios.post(`${process.env.REACT_APP_API}/product`,product,{
        headers:{
            authtoken: token
        }
    })

export const getProductsByCount = async(count) => 
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`)


export const removeProduct = async (slug,token) => 
    await axios.delete(`${process.env.REACT_APP_API}/product/delete/${slug}`,{
       headers:{
           authtoken: token
       }
   })

export const getProduct = async(slug) => 
   await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)


export const updateproduct = async (slug,product,token) => 
   await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
      headers:{
          authtoken: token
      }
  })

export const getproducts = async(sort,order,page) => 
  await axios.post(`${process.env.REACT_APP_API}/products`,{
      sort,
      order,
      page
  })

export const getProductsCount = async() => 
  await axios.get(`${process.env.REACT_APP_API}/product/count`)


  export const productStar = async (productId,star,token) => 
   await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`,{star},{
      headers:{
          authtoken: token
      }
  })

  export const getRelatedProduct = async(productId) => 
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

  export const searchFilter = async(arg) => 
    await axios.post(`${process.env.REACT_APP_API}/search/filter`,arg)