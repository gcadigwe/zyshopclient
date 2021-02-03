import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {createCategory,getCategories,removeCategory} from '../../../function/category'
import AdminNav from '../../../components/nav/AdminNav';
import Spinner from '../../../components/Spinner/Spinner'
import LocalSearch from "../../../components/forms/LocalSearch";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForms'
import {DeleteOutlined, EditOutlined,} from '@ant-design/icons';
const AdminDashboard = () => {
    const [name,setName] = useState('')
    const [loading,Setloading] = useState(false)
    const [Categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState("");
    const {Auth} = useSelector(state=>({...state}))

    const SubmitHandler = (e) => {
        e.preventDefault()
        Setloading(true)
        createCategory({name},Auth.token)
        .then(response => {
            Setloading(false)
            setName("")
            
            toast.success(`New Category has been created`)
            loadCategories()
        })
        .catch(err => {
            Setloading(false)
            console.log(err)
            toast.error(err.response)
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])

    const loadCategories = () => {
        getCategories()
        .then(c => {
            setCategories(c.data)
        })
    }


    const RemoveHandler = (slug) => {
        
        if(window.confirm('Delete Category?')){
            Setloading(true)
            removeCategory(slug,Auth.token)
            .then(res => {
                Setloading(false)
                toast.error(`Category has been deleted`)
                loadCategories() 
            })
            .catch((err)=>{
                    Setloading(false);
                    toast.error(err.response)
            })
        }
    }
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
      };
      
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
            {loading ? <Spinner /> :<h4>Create Category</h4>}
            <CategoryForm SubmitHandler={SubmitHandler} name={name} setName={setName} />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
           
            {Categories.filter(searched(keyword)).map((c) => (
                <div className="alert alert-secondary" key={c._id}>{c.name}
                <Link to={`/admin/category/${c.slug}`}> 
                <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
                </span>
                </Link>
                
                <span onClick={()=>RemoveHandler(c.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
                </span>
                </div>
            ))}
            </div>
        </div>
    </div>)
}

export default AdminDashboard;