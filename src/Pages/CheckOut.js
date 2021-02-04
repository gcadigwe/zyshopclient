import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getcart,emptycart,saveaddress} from '../function/user'
import {toast} from 'react-toastify'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
    const [product,setProduct] = useState([])
    const [total,setTotal] = useState(0)
    const [address,setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false);
    const {Auth} = useSelector(state => ({...state}))

    const dispatch = useDispatch()




    useEffect(()=> {
        getcart(Auth.token).then(res => {
            console.log(res.data)
            setProduct(res.data.products)
            setTotal(res.data.cartTotal)
        }).catch(err => console.log(err))
    },[])


    const saveAddresstoDB = () => {
        saveaddress(address,Auth.token).then(res => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
              }
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    }

    const deleteCart = () => {
        //from localstorage
        if(typeof window !== "undefined"){
            localStorage.removeItem("cart")
        }

        //from redux
        dispatch({
            type:"ADD_TO_CART",
            payload:[]
        })

        //from database
        emptycart(Auth.token).then(res => {
            if(res.ok){
                setProduct([])
                setTotal(0)
            }
        })

        toast.success("cart deleted")
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                <ReactQuill theme="snow" value={address} onChange={setAddress} />
                <button onClick={saveAddresstoDB} className="btn btn-primary btn-raised mt-1">
                    Save
                </button>
                <hr />
                Got Coupon ?
                <br />
                Coupon input and apply button
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {product.length}</p>
                <hr />
                {product.map((p,i)=>(
                    <div key={i}>
                        {p.product.title} ({p.color}) x {p.count} = {""} {p.product.price * p.count}
                    </div>
                ))}
                <hr />
                <p>Cart Total : {total}</p>
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary" disabled={!addressSaved || !product.length}>
                            Place Order
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button disabled={!product.length} onClick={deleteCart} className="btn btn-primary">
                            Empty Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout;