import React,{useEffect,useState} from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRoute'
import {currentAdmin} from '../function/auth'

const AdminRoute = ({ children, ...rest }) => {
    const {Auth} = useSelector((state => ({...state})))
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        if(Auth && Auth.token){
            currentAdmin(Auth.token)
            .then(res => {
            console.log("CURRENT ADMIN",res)
            setOk(true)
        })
            .catch(err => {
            console.log("CURRENT ADMIN ERROR",err)
            setOk(false)})
            }
    },[Auth])
        

    return ok ? (<Route {...rest} />) : (
        <LoadingToRedirect/>
    )
}

export default AdminRoute;