import React, { useState } from 'react'
import {Card,Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {showAverage} from '../../function/ratings'
import _ from 'lodash'
import {useSelector,useDispatch} from 'react-redux';
import { ADD_TO_CART } from '../../Action/actions/actionTypes'


const { Meta } = Card;

const ProductCard = ({product}) => {

    //redux
    const {Auth,Cart} = useSelector((state)=>({...state}))
    const dispatch = useDispatch()

    const [tooltip,setTooltip] = useState("Click to Add")

    const {slug,title,description,images,ratings,price} = product

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

            dispatch({
                type:"SET_VISIBLE",
                payload:true
            })

        }
    }

    return(
        <>
            {product && ratings && ratings.length > 0
          ? showAverage(product)
          : (<div className="text-center pt-3 pb-3">No rating yet </div>)}



        <Card cover={
            <img src={images && images.length ? images[0].url : ""}
            style={{height:"150px",objectFit:"cover"}}
            className="p-1" />
        }
        actions={[
            <Link to={`/product/${slug}`}>
                <EyeOutlined className="text-warning"/> <br /> View Product
            </Link>,
            <Tooltip title={tooltip}>
                <a onClick={handleAddToCart} > <ShoppingCartOutlined className="text-danger"/> <br /> Add to cart </a>
            </Tooltip> ,
        ]}>
            <Meta title={`${title} - $${price}`} description={`${description && description.substring(0,60)}...`} />

        </Card>
        </>
    )
}

export default ProductCard;