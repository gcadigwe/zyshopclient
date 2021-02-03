import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {usercart, usertoken} from '../function/user'
import ProductCardInCheckout from '../components/cards/ProductInCardCheckout'

const Cart = ({history}) => {
    const dispatch = useDispatch()
    const {Auth,Cart} = useSelector(state => ({...state}))

    const showTotal = () => {
            return Cart.reduce((currentValue, nextValue) => {
              return currentValue + nextValue.count * nextValue.price;
            }, 0);
        
    }

    const showCartItems = () => (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Color</th>
              <th scope="col">Quantity</th>
              <th scope="col">Shipping</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
    
          {Cart.map((p) => (
            <ProductCardInCheckout key={p._id} p={p} />
          ))}
        </table>
      );
          const saveCartToDB = () => {
            usercart(Cart,Auth.token).then(res => {
              console.log(res)
              if(res.data.ok){
                history.push('/checkout')
              }
            }).catch(err => {
              console.log(err)
            })
          }
    return (
        <div className="container-fluid pt-2">
            <div className="row">
                {/* <h4>Cart / {Cart.length} Products</h4> */}
            </div>
            <div className="row">
            {/* <h4>Cart / {Cart.length} Products</h4> */}
                <div className="col-md-8">
                <h4>Cart / {Cart.length} Products</h4>
                    {!Cart.length ? <p>No product in cart.<Link to="/shop">continue shopping</Link></p>:
                    showCartItems()}
                </div>
                <div className="col-md-4">
                <h4>Order Summary</h4>
                <hr/>
                    <p>Products</p>
                    {Cart.map((c,i)=>(
                        <div key={i}>{c.title} x {c.count} = ${c.price * c.count}</div>
                    ))}
                    <hr />
                        Total = ${showTotal()}
                    <hr />
                    {Auth ? <button onClick={saveCartToDB} disabled={!Cart.length} className="btn btn-primary btm-sm mt-1">Proceed to checkout</button> : <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>}
                </div>
            </div>
        </div>
    )
}

export default Cart;