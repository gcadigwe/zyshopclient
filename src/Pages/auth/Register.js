import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import {useSelector} from 'react-redux';

const Register = ({history}) => {
    const [RegisterValue, setRegisterValue] = useState('')
    const {Auth} = useSelector((state=>({...state})))

    useEffect(()=>{
        if(Auth && Auth.token){
            history.push('/')
        }
    },[Auth, history])
    
    const SubmitHandler = async (event) => {
        event.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(RegisterValue, config)
        .then(res=>{
            console.log(res)
            toast.success(
                `Email is sent to ${RegisterValue}. Click the link to complete your registration`
            )
        })
        .catch(err => {
            toast.error(err.message)
        })
        

        // save user email in localStorage

        localStorage.setItem('emailForSignIn', RegisterValue);

        // clear state

        setRegisterValue('');
    }

    const registerForm = () => (
        <form onSubmit={SubmitHandler}>
            <input type="email" className="form-control" value={RegisterValue} 
            onChange={event => setRegisterValue(event.target.value)} autoFocus />

        <br/>
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    )
    return(
        
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
            
        </div>
    )
}

export default Register;