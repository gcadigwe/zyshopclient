import React,{useEffect} from 'react';
import {Switch,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase';
import {useDispatch} from 'react-redux';

import product from './Pages/product'
import Home from './Pages/Home';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Header from './components/nav/header';
import History from './Pages/User/history';
import Wishlist from './Pages/User/wishlist';
import Password from './Pages/User/password';
import AdminDashboard from './Pages/admin/adminPage'
import AdminRoute from './RedirectRoute/UserRoute'
import categorypage from './Pages/admin/category/categorypage'
import CategoryUpdate from './Pages/admin/category/categoryUpdate'
import ProductCreate from './Pages/admin/Product/ProductCreate'
import ProductUpdate from './Pages/admin/Product/ProductUpdate'
import Allproduct from './Pages/admin/Product/Allproduct'
import CategoryHome from './Pages/Category/CategoryHome'
import SubHome from './Pages/Sub/SubHome'
import Shop from './Pages/shop'
import Cart from './Pages/Cart'
import SideDrawer from './components/Drawer/SideDrawer'
import Checkout from './Pages/CheckOut'

import UserRoute from './RedirectRoute/UserRoute'
import RegistrationComplete from './Pages/auth/RegistrationComplete'
import ForgotPassword from './Pages/auth/ForgotPassword'
import 'antd/dist/antd.css'
import * as actionTypes from './Action/actions/actionTypes'
import {currentuser} from './function/auth'
import SubCreate from './Pages/admin/sub/SubCreate';
import SubUpdate from './Pages/admin/sub/SubUpdate'

const App=()=> {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult()

        currentuser(idTokenResult.token)
            .then(res => {
                dispatch({type: actionTypes.LOGIN_USER,
                    payload: {
                    
                      email: res.data.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      name: res.data.name,
                      _id: res.data._id,
                      
                    }})
            })
            .catch(err => console.log(err))
      }
      
    })
    return ()=>unsubscribe()
  }, [dispatch])


  return (
    <>
      <Header />;
      <ToastContainer />
      <SideDrawer />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register/complete" component={RegistrationComplete} />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      <UserRoute exact path="/user/history" component={History} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      <UserRoute exact path="/user/password" component={Password} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
      <AdminRoute exact path="/admin/category" component={categorypage}/>
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
      <AdminRoute exact path="/admin/subcategory" component={SubCreate}/>
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate}/>
      <AdminRoute exact path="/admin/product" component={ProductCreate}/>
      <AdminRoute exact path="/admin/products" component={Allproduct}/>
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>
      <Route exact path="/product/:slug" component={product} />
      <Route exact path="/category/:slug" component={CategoryHome} />
      <Route exact path="/sub/:slug" component={SubHome} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />

      <Route exact path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;
