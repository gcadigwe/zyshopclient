import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {createSub,getSubs,removeSub} from '../../../function/sub'
import {getCategories} from '../../../function/category'

import AdminNav from '../../../components/nav/AdminNav';
import Spinner from '../../../components/Spinner/Spinner'
import LocalSearch from "../../../components/forms/LocalSearch";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForms'
import {DeleteOutlined, EditOutlined,} from '@ant-design/icons';
const SubCreate = () => {
    const [name,setName] = useState('')
    const [loading,Setloading] = useState(false)
    const [Categories, setCategories] = useState([])
    const [Subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState("");
    const [Category,setCategory] = useState("");
    const {Auth} = useSelector(state=>({...state}))

    const SubmitHandler = (e) => {
        e.preventDefault()
        Setloading(true)
        createSub({name,parent:Category},Auth.token)
        .then(response => {
            Setloading(false)
            setName("")
            
            toast.success(`New Sub has been created`)
            loadSubs()
        })
        .catch(err => {
            Setloading(false)
            console.log(err)
            toast.error(err.response)
        })
    }

    useEffect(()=>{
        loadCategories()
        loadSubs()
    },[])

    const loadCategories = () => 
        getCategories()
        .then(c => {
            setCategories(c.data)
        })

    const loadSubs = () => 
        getSubs()
        .then(s => {
            setSubs(s.data)
        })


    const RemoveHandler = (slug) => {
        
        if(window.confirm('Delete Category?')){
            Setloading(true)
            removeSub(slug,Auth.token)
            .then(res => {
                Setloading(false)
                toast.error(`Sub Category has been deleted`)
                loadSubs()
                
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
            {loading ? <Spinner /> :<h4>Create Sub Category</h4>}
            <div className="form-group">
                <label>Parent Category</label>
                <select  name="category" className="form-control" type="select" onChange={(e)=>setCategory(e.target.value)}>
                    <option>Please Select</option>
                    {Categories.length > 0 && Categories.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <CategoryForm SubmitHandler={SubmitHandler} name={name} setName={setName} />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
           
            {Subs.filter(searched(keyword)).map((s) => (
                <div className="alert alert-secondary" key={s._id}>{s.name}
                <Link to={`/admin/sub/${s.slug}`}> 
                <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
                </span>
                </Link>
                
                <span onClick={()=>RemoveHandler(s.slug)} className="btn btn-sm float-right">
                <DeleteOutlined className="text-danger" />
                </span>
                </div>
            ))}
            </div>
        </div>
    </div>)
}

export default SubCreate;