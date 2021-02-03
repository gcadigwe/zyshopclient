import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import {getCategories} from '../../function/category'

const CategoryList = () => {
    const [category,setCategory] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getCategories()
        .then(res => {
            setLoading(false)
            console.log(res.data)
            setCategory(res.data)
        })
    },[])




    return (
        <div className="container">
            <div className="row">
            {loading ? (<div className="text-center text-warning">loading...</div>):(<div>
                {category.map((c)=>(
                    <div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                        <Link to={`category/${c.slug}`}>{c.name}</Link>
                    </div>
                ))}
            </div>)}
            </div>
            
        </div>
    )
}

export default CategoryList;