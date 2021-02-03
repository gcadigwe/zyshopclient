import React,{useEffect,useState} from 'react';
import {getCategory} from '../../function/category'
import {Link} from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = ({match}) => {
    const {slug} = match.params
    const [category,setCategory] = useState({})
    const [product,setProduct] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getCategory(slug).then((res)=> {
            console.log(res.data)
            setLoading(false)
            setProduct(res.data.products)
            setCategory(res.data.category)
        })
    },[])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                    {loading ? (
                <h4 className="text-center p-3 mb-3 mt-3 display-4 jumbotron">
                    Loading...
                </h4>
            ) : (
                <h4 className="text-center p-3 mb-3 mt-3 display-4 jumbotron">
                    {product.length} Products were found in "{category.name}" Category
                </h4>
            ) }
                    </div>
                </div>

                <div className="row">
                    {product.map(p => (
                        <div className="col-md-4" key={p._id}>
                            <ProductCard product={p} />
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryHome;