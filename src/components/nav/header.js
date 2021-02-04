import React,{useState} from 'react';
import { Menu ,Badge} from 'antd';
import {HomeOutlined, SettingOutlined, ShoppingCartOutlined,ShoppingOutlined,UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import firebase from 'firebase';
import * as actionTypes from '../../Action/actions/actionTypes'
import Search from '../../components/cards/Search'


const { SubMenu, Item } = Menu;

const Header = () => {
    const [current,setCurrent] = useState('Home')
    const dispatch = useDispatch()
    const history = useHistory()
    const {Auth} = useSelector((state)=>({...state}))
    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type: actionTypes.LOGOUT_USER,
        payload: null
      })

      history.push('/login')
    }

    const {Cart} = useSelector(state => ({...state}))

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        
        <Item key="Home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={Cart && Cart.length} offset={[9,0]}>
              Cart
            </Badge>
          </Link>
        </Item>
          
        {!Auth && (<Item key="Register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
        </Item>)}
        
        {!Auth && (<Item key="Login" icon={<UserOutlined />} className="float-right" >
        <Link to="/login">Login</Link>
        </Item>)}
        

        

        
        {Auth && (
          <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={Auth.email.split("@")[0]}
          className="float-right"
        >
            {Auth && Auth.role === 'admin' ? <Item><Link to="/admin/dashboard">Dashboard</Link></Item> : <Item><Link to="/user/history">Dashboard</Link></Item>}
            <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        </SubMenu>
        )}
        <span className="float-right p-1">
          <Search />
        </span>

        
      </Menu>
    )
};

export default Header;

