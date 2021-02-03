import React,{useState,useEffect} from 'react';
import {getproducts,getProductsCount} from '../../function/product'
import ProductCard from '../cards/ProductCard'
import { Pagination } from 'antd'
import LoadingCard from '../cards/ProductCard'


const NewArrivals = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [productscount,setProductscount] = useState(0)
    const [page,setPage] = useState(1)

    useEffect(()=>{
        loadProducts()
    },[page])

    useEffect(()=>{
        getProductsCount()
        .then(res => {
            setProductscount(res.data)
        })
    },[])

    const loadProducts = () => {

        //sort,order,limit
        
        getproducts("createdAt","desc",page)
        .then(res => {
            setLoading(false)
            setProducts(res.data)
            
        })
        .catch(err => {
            setLoading(false)

        })
    }

   
    return(
        <div>
            
            {loading ? (<LoadingCard count={3} />) : (<div className="container">
                <div className="row">
                {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
                </div>
            </div>)}
            <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          {/* <Pagination
            current={page}
            total={(productscount / 3) * 10}
            onChange={(value) => setPage(value)}
          /> */}
          <Pagination defaultCurrent={page} total={(productscount / 3) * 10}
          onChange={(value) => setPage(value)} />
        </nav>
      </div>
        </div>
    )
}

export default NewArrivals;