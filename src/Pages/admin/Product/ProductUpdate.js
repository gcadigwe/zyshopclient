import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {getProduct,updateproduct} from '../../../function/product'
import AdminNav from '../../../components/nav/AdminNav';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import Spinner from '../../../components/Spinner/Spinner'
import { toast } from 'react-toastify';
import { getCategories,getCategorySubs } from '../../../function/category';
import FileUpload from '../../../components/forms/FileUpload'


const ProductUpdate = ({match,history}) => {

    //redux state

    const {Auth} = useSelector((state)=>({...state}))


    const initialstate = {
        title: '',
        description:'',
        price:'',
        category:'',
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black","Brown","Silver","White","Blue"],
        brands:["Apple", "Samsung", "Richard Millie", "Lenovo", "Acer"],
        brand:'',
        color:''
    }

    //state
    const [values, setValues] = useState(initialstate)
    const [subSelect,  setSubSelect] = useState([])
    const [categories,setCategories] = useState([])
    const [showSub,setShowSub] = useState(false);
    const [arrayOfSubs,setarrayOfSubids] = useState([])
    const [selectedCategory,setSelectedCategory] = useState("")
    const [loading,setLoading] = useState(false)

    

    const {slug} = match.params

    useEffect(()=>{
        loadProduct()
        loadCategories()
    },[])

    const loadProduct = () => {
        getProduct(slug)
        .then((p)=>{
            // console.log("single product ==>",p)
            setValues({...values,...p.data})
            //load subs
            getCategorySubs(p.data.category._id)
            .then(res => {
                setSubSelect(res.data)
            })
            //
            let arr = []
            p.data.subs.map(s=>{
                arr.push(s._id)
            })
            console.log("ARR",arr)

            setarrayOfSubids((prev)=>arr)
        })
    }

    const loadCategories = () => {
        getCategories().then((c)=>{
            setCategories(c.data)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        //
        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category
        updateproduct(slug,values,Auth.token)
        .then(res => {
            setLoading(false)
            toast.success(`${res.data.title} has been updated`)
            history.push("/admin/products")
        })
        .catch(err => {
            setLoading(false)
            toast.error(err)
        })
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleSubChange = (e) => {
        e.preventDefault()
        setValues({...values,subs: []})
        console.log("Category Clicked ----",e.target.value)
        //set selected category
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value)
        .then((res)=>{
            setSubSelect(res.data)
            console.log(res)
        })
        if(values.category._id === e.target.value){
            loadProduct()
        }
        //clear old sub category ids
        setarrayOfSubids([])
    }


    

    return(
        <div className="container-fluid">
            <div className="row">
                <div classname="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <Spinner /> : <h4>Product Update Page</h4>}
                    <div className="p-3">
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                    </div>
                    <ProductUpdateForm 
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    handleSubChange={handleSubChange}
                    subSelect={subSelect}
                    showSub={showSub}
                    categories={categories}
                    arrayOfSubs={arrayOfSubs}
                    setarrayOfSubids={setarrayOfSubids}
                    selectedCategory={selectedCategory}

                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;