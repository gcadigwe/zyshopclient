import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {createProduct} from '../../../function/product'
import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import Spinner from '../../../components/Spinner/Spinner'
import { toast } from 'react-toastify';
import { getCategories,getCategorySubs } from '../../../function/category';
import FileUpload from '../../../components/forms/FileUpload'


const ProductCreate = () => {

    //redux state

    const {Auth} = useSelector((state)=>({...state}))


    const initialstate = {
        title: '',
        description:'',
        price:'',
        category:'',
        categories:[],
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:["Apple", "Samsung", "Richard Millie", "Lenovo", "Acer"],
        brand:'',
        color:''
    }

    const [values, setValues] = useState(initialstate)
    const [subSelect,  setSubSelect] = useState([])
    const [showSub,setShowSub] = useState(false);
    const [loading,setLoading] = useState(false)

    //loading categories

    useEffect(()=>{
        loadCategories()
    },[])
   
    const loadCategories = () => {
        getCategories().then((c)=>{
            setValues({...values,categories:c.data})
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values,Auth.token).then((res)=>{
            console.log(res)
            window.alert(`${res.data.title} is Created`)
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
            toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleSubChange = (e) => {
        e.preventDefault()
        setValues({...values,subs: [],category:e.target.value})
        console.log("Category Clicked ----",e.target.value)
        getCategorySubs(e.target.value)
        .then((res)=>{
            setSubSelect(res.data)
            console.log(res)
        })

        setShowSub(true)
    }


    return(
        <div className="container-fluid">
            <div className="row">
                <div classname="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <Spinner /> : <h4>Product Create</h4>}
                    <hr/>
                    <div className="p-3">
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                    </div>
                    
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} handleSubChange={handleSubChange}
                    subSelect={subSelect} showSub={showSub} setValues={setValues} />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;