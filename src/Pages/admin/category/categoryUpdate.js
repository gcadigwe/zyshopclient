import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {updateCategory,getCategory} from '../../../function/category'
import CategoryForm from '../../../components/forms/CategoryForms'
import AdminNav from '../../../components/nav/AdminNav';
import Spinner from '../../../components/Spinner/Spinner'
import { toast } from 'react-toastify';
const CategoryUpdate = ({history,match}) => {
    const [name,setName] = useState('')
    const [loading,Setloading] = useState(false)
    const {Auth} = useSelector(state=>({...state}))

    const SubmitHandler = (e) => {
        e.preventDefault()
        Setloading(true)
        updateCategory({name},match.params.slug,Auth.token)
        .then(response => {
            Setloading(false)
            setName("")
            
            toast.success(`Category has been updated`)
            history.push('/admin/category')
        })
        .catch(err => {
            Setloading(false)
            console.log(err)
            toast.error(err.response)
        })
    }

    useEffect(()=>{
        loadCategory();
    },[])

    const loadCategory = () => {
        getCategory(match.params.slug)
        .then(c => {
            // console.log(c.data.name)
            setName(c.data.name)
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
            {loading ? <Spinner /> :<h4>Update Category</h4>}
            <CategoryForm SubmitHandler={SubmitHandler} name={name} setName={setName} />
            </div>
        </div>
    </div>)
}

export default CategoryUpdate;