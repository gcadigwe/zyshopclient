import React, { useState } from "react";
import ModalImage from 'react-modal-image'
import {useDispatch} from 'react-redux'
import {Input} from 'antd'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'
import {CheckCircleOutlined,CloseCircleOutlined,CloseOutlined} from '@ant-design/icons'

const ProductCardInCheckout = ({ p }) => {

  const colors = ["Black", "Brown", "Silver", "White", "Blue"]
  const history = useHistory()
  const dispatch = useDispatch()
  const handleChange = (e) => {
      let cart = []

      if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
           cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product,i)=>{
          if(product._id === p._id){
            cart[i].color = e.target.value
          }
        })

        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch({
          type:"ADD_TO_CART",
          payload:cart
        })

      }
  }

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

      history.go(0)
    }

    
  };

  const hnadleRemove = () => {
    //
    let cart = []

      if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
           cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product,i)=>{
          if(product._id === p._id){
            cart.splice(i,1)
          }
        })

        localStorage.setItem('cart',JSON.stringify(cart))
        dispatch({
          type:"ADD_TO_CART",
          payload:cart
        })
        history.go(0)

      }
  }
  return (
    <tbody>
      <tr>
        <td>
          <div style={{width:"100px",height:"auto"}}>
            {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />): (<p>images</p>)}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select className="form-control" onChange={handleChange} name="color">
            {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
            {colors.filter(c => c !== p.color).map(c => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
        </td>
        <td className="text-center">
          <input className="form-control" type="number" defaultValue={p.count} value={p.count} onChange={handleQuantityChange} />
        </td>
        <td className="text-center"> 
          {p.shipping === "Yes" ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
        </td>
        <td className="text-center">
          <CloseOutlined style={{cursor:"pointer"}} className="text-danger" onClick={hnadleRemove} />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;