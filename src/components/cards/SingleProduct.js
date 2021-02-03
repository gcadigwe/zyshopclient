import React,{useState} from 'react'
import {Card,Tabs,Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'
import listinfo from './listinfo'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {HeartOutlined,ShopOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import Listinfo from './listinfo'
import StarRating from "react-star-ratings";
import RatingModal from '../../components/modal/RatingModal'
import _ from 'lodash'
import {useSelector,useDispatch} from 'react-redux';


const {Meta} = Card
const {TabPane} = Tabs

const SingleProduct = ({product,onStarClick,showAverage,star}) => {

    const {slug,title,description,images,ratings,price,_id} = product

        //redux
        const {Auth,Cart} = useSelector((state)=>({...state}))
        const dispatch = useDispatch()
    
        const [tooltip,setTooltip] = useState("Click to Add")
    
        
    
        const handleAddToCart = () => {
            let cart = []
            if(typeof window !== 'undefined'){
                if(localStorage.getItem('cart')){
                    cart = JSON.parse(localStorage.getItem('cart'))
                }
                //push product to cart
                cart.push({
                    ...product,
                    count:1
                })
                //avoid duplicate
                let unique = _.uniqWith(cart,_.isEqual)
    
                //save to localstorage
    
                localStorage.setItem('cart',JSON.stringify(unique))
                setTooltip("Added")
                dispatch({
                    type:"ADD_TO_CART",
                    payload:unique
                })
    
            }
        }

    // const {title,images,description,_id} = product
    return(
        <>
            
            <div className="col-md-7">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map(image => (
                            <img src={image.url} key={image.public_id}/>
                    ))}
                </Carousel>

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>

                    <TabPane tab="More" key="2">
                        call us on xxx-xxx-xxx-xxxx to order
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
            <h1 className="bg-info p-3">{title}</h1>
            {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="text-center pt-3 pb-3">No rating yet </div>}
                <Card actions={[
                    <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart} > <ShoppingCartOutlined className="text-danger"/> <br /> Add to cart </a>
                </Tooltip>,
                    <Link to="/">
                        <HeartOutlined className="text-info"/> <br /> Add to Wishlist
                    </Link>,
                    <RatingModal>
                    <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
                    </RatingModal>
                ]}>
                    <Listinfo product={product}/>
                    
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;