import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount) => --currentCount)
        },1000)

        count === 0 && history.push("/")
        
        return () => clearInterval(interval)
    },[count])

    return (
        <div className="container p-5 text-center">
            <Spinner />
        </div>
    )
}

export default LoadingToRedirect;