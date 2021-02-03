import React,{useState} from 'react';
import UserNav from '../../components/nav/UserNav';
import {toast} from 'react-toastify';
import {auth} from '../../firebase';
import Spinner from '../../components/Spinner/Spinner'

const Password = () => {
    const [password,setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        await auth.currentUser.updatePassword(password)
        .then(()=>{
            setLoading(false)
            toast.success("Password Updated Successfully")
            setPassword('')
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message)
        })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={submitHandler}>
            <div className="form-group">
            <input className="form-control" type="password" value={password}
            disabled={loading}
            placeholder="Your New Password" 
            onChange={e => setPassword(e.target.value)} />
            <br />
            <button className="btn btn-primary" disabled={!password || loading || password.length < 6}>Submit</button>
            </div>
        </form>
    )

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
                
            </div>
            <div className="col">
                
            {loading ? <Spinner /> : <h4>Password update</h4>}
            {passwordUpdateForm()}
            
            </div>
            
            
        </div>
    </div>
)
}

export default Password;