import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth, googleAuthProvider} from '../../firebase';
import {Button} from 'antd';
import {MailOutlined, GoogleOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux';
import * as actionTypes from '../../Action/actions/actionTypes'
import Spinner from '../../components/Spinner/Spinner'
import {Link} from 'react-router-dom'
import {createorupdate} from '../../function/auth';

const Login = ({history}) => {
    const [RegisterValue, setRegisterValue] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const RolebasedRedirect = (res) => {
        let intended = history.location.state
        if(intended){
            history.push(intended.from)
        }else{
            if (res.data.role === "admin"){
                history.push('/admin/dashboard')
            }else{
                history.push('user/history')
            }
        }
    }

    const {Auth} = useSelector((state=>({...state})))

    useEffect(()=>{
       let intended = history.location.state
       if (intended){
           return;
       }else {
        if(Auth && Auth.token){
            history.push('/')
        }
       }
    },[Auth, history])
    
    const SubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true)

        try {
            const result = await auth.signInWithEmailAndPassword(RegisterValue, password);
            console.log(result)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            createorupdate(idTokenResult.token)
            .then(res => {
                dispatch({type: actionTypes.LOGIN_USER,
                    payload: {
                    
                      email: res.data.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      name: res.data.name,
                      _id: res.data._id,
                      
                    }})
                RolebasedRedirect(res)
            })
            .catch(err => console.log(err))

           
           
        } catch (error) {
            toast.error(error.message)
            setLoading(false)

        }

        //  history.push('/');

    }

    const GLoginHandelr = async(event) => {
        event.preventDefault()
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result)=> {
            const {user} = result
           const idTokenResult = await user.getIdTokenResult()

           createorupdate(idTokenResult.token)
            .then(res => {
                dispatch({type: actionTypes.LOGIN_USER,
                    payload: {
                    
                      email: res.data.email,
                      token: idTokenResult.token,
                      name: res.data.name,
                      role: res.data.role,
                      _id: res.data._id,
                      
                    }})
                RolebasedRedirect(res)
            })

            // history.push("/")
        })
        .catch(error => {
            toast.error(error.message)
        })
    }

    const LoginForm = () => (
        <form onSubmit={SubmitHandler}>
            <div className="form-group">
                <input type="email" className="form-control" value={RegisterValue} 
                onChange={event => setRegisterValue(event.target.value)} placeholder="Your email" autoFocus />
            </div>
            
            <div className="form-group">
                <input type="password" className="form-control" value={password} 
                onChange={event => setPassword(event.target.value)} placeholder="password" />
            </div>

        <br/>
            <Button 
            onClick={SubmitHandler}
            type="primary"
            className="mb-3"
            size="large"
            block
            shape="round"
            icon={<MailOutlined />}
            disabled={!RegisterValue || !password > 6}
            >Login with Email and Password</Button>
        </form>
    )

    const ForgotPassword = () => (
        <Link to="/forgot/password" className="float-right" style={{color: 'red'}}>Forgot password?</Link>
    )

    const GoogleButton = () => (
        <Button 
            onClick={GLoginHandelr}
            type="danger"
            className="mb-3"
            size="large"
            block
            shape="round"
            icon={<GoogleOutlined />}
            >Login with Google</Button>
    )
    return(
        
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <Spinner /> : <h4>Login</h4>}
                    {LoginForm()}
                    {GoogleButton()}
                    {ForgotPassword()}
                </div>
            </div>
            
        </div>
    )
}

export default Login;