import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import * as actionTypes from '../../Action/actions/actionTypes';
import {useDispatch, useSelector} from 'react-redux';
import {createorupdate} from '../../function/auth'

const RegistrationComplete = ({history}) => {
    const [password, setPassword] = useState('')
    const [RegisterValue, setRegisterValue] = useState('')

     const dispatch = useDispatch();
     const {Auth} = useSelector((state=>({...state})))
    useEffect(()=>{
       setRegisterValue(localStorage.getItem('emailForSignIn'))
    },[])

    
    // const SubmitHandler = async (event) => {
    //     event.preventDefault();

    //     const config = {
    //         url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    //         handleCodeInApp: true
    //     }

    //     await auth.sendSignInLinkToEmail(RegisterValue, config)
    //     toast.success(
    //         `Email is sent to ${RegisterValue}. Click the link to complete your registration`
    //     )

    //     // save user email in localStorage

    //     localStorage.setItem('emailForSignIn', RegisterValue);

    //     // clear state

    //     setRegisterValue('');
    // }

    const SubmitHandler = async (event) => {
        event.preventDefault();
        if(!RegisterValue || !password){
            toast.error('Email and Password are required')
            return;
        }

        if(password < 6){
            toast.error('Password must be more than 6 characters')
            return;
        }
        try{
        const result = await auth.signInWithEmailLink(RegisterValue, window.location.href)
       
            if(result.user.emailVerified){
                localStorage.removeItem('emailForSignIn')

                const user = auth.currentUser
                await user.updatePassword(password)
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
                })
                .catch(err => console.log(err))
                history.push('/')

            }
        }
         catch (error) {

            toast.error(error.message)
            
        }
    }


    const registrationComplete = () => (
        <form onSubmit={SubmitHandler}>
            <input type="email" className="form-control" value={RegisterValue} 
            disabled />
            <br/>
            <input type="password" className="form-control" value={password} onChange={event => {
                setPassword(event.target.value)
            }} autoFocus />

        <br/>
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    )
    return(
        
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registrationComplete()}
                </div>
            </div>
            
        </div>
    )
}

export default RegistrationComplete;