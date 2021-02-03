import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'

const Search = () => {
    const Dispatch = useDispatch()
    const {Search} = useSelector((state)=>({...state}))
    const {text} = Search
    const history = useHistory()

    const handleChange = (e) => {
        Dispatch({
            type:"SEARCH_QUERY",
            payload:{text:e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }

    return (
        <>

            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="search" onChange={handleChange} value={text} />
                <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer'}} />
            </form>
        </>
    )
}

export default Search;