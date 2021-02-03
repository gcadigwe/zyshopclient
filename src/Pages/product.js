import React,{useEffect,useState} from 'react'
import {getProduct,productStar} from '../function/product'
import SingleProduct from '../components/cards/SingleProduct'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {showAverage} from '../function/ratings'
import {getRelatedProduct} from '../function/product'
import ProductCard from '../components/cards/ProductCard'

const Product = ({match}) => {
    const [product,setProduct] = useState({})
    const [related,setRelated] = useState([])
    const [star,setStar] = useState(0)

    const {slug} = match.params

    const {Auth} = useSelector(state => ({...state}))

    

    useEffect(()=>{
        loadproduct()
    },[slug])

    useEffect(() => {
        if (product.ratings && Auth) {
          let existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy.toString() === Auth._id.toString()
          );
          existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
      });

    const loadproduct = () => {
        getProduct(slug)
        .then(res => {
            setProduct(res.data)
            getRelatedProduct(res.data._id)
            .then(res => {
              setRelated(res.data)
            })
        })
    }

    // const ProductRating = (newRating,name) => {
    //     setStar(newRating)
    //     RatingProduct(name,newRating,Auth.token)
    //     .then(res => {
    //         console.log(newRating)
    //         console.log(res.data)
    //     })
    // }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, Auth.token).then((res) => {
            toast.success("Thanks For Leaving A Review")
          console.log("rating clicked", res.data);
          loadproduct(); // if you want to show updated rating in real time
        });
      };

    return(
        <div className="container-fluid pt-4">
            <div className="row">
            <SingleProduct product={product} showAverage={showAverage} star={star} onStarClick={onStarClick} />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    {related.map(r => (
                      <div className="col-md-4" key={r._id}>
                        <ProductCard product={r} />
                      </div>
                    ))}
                    <hr />
                </div>
            </div> 
        </div>
    )
}

export default Product