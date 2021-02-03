import React,{useEffect,useState} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import {getProductsByCount,removeProduct} from '../../../function/product'
import Spinner from '../../../components/Spinner/Spinner'
import AdminProductCard from '../../../components/cards/AdminProductCard';
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'


const Allproduct = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        loadAllProducts()
    },[])

    const {Auth} = useSelector((state)=>({...state}))

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
          .then((res) => {
            setProducts(res.data);
            console.log(res.data)
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      };

    const handleremove = (slug) => {
      if(window.confirm("Delete?")){
        removeProduct(slug,Auth.token)
        .then((res)=>{
          console.log(res.data)
          loadAllProducts()
          toast.error(`${res.data.title} has been deleted`)
        })
        .catch((err)=>{
          toast.error("There was a problem deleting this product")
        })
      }
    }

    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
            {loading ? <Spinner /> : <h4>All Products</h4>}
            <div className="row">
            {products.map(product => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard handleremove={handleremove} product={product}  />
              </div>
            ))}
            </div>
            </div>
        </div>
    </div>
    )
    
}

export default Allproduct;