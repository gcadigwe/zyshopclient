import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import Spinner from '../../components/Spinner/Spinner'

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {Auth} = useSelector(state => ({...state}))

    useEffect(()=>{
        if(Auth && Auth.token){
            history.push('/')
        }
    },[Auth,history])

    const FormSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setLoading(false)
            setEmail('')
            toast.success('A password reset link has been sent to your email');
        })
        .catch((error)=>{
            setLoading(false)
            toast.error(error.message)
        })
    }

    const inputForm = () => (
        <form onSubmit={FormSubmitHandler}>
            <input type="email" className="form-control" value={email} onChange={e => {
                setEmail(e.target.value)
            }} placeholder="Type Your Email" autoFocus />
            <br/>
            <button type="submit" disabled={!email} className="btn btn-raised">Continue</button>
        </form>
    )

    return (
        <div className="container-p5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <Spinner /> : <h4>Forgot Password</h4>}
                    {inputForm()}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;