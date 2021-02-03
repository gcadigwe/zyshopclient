import React from 'react'
import {Select} from 'antd'


const {Option} = Select

const ProductCreateForm = ({handleSubmit,handleChange,values,handleSubChange,subSelect,showSub,setValues}) => {

    const {title,description,price,category,categories,subs,shipping,quantity,images,colors,brands,color,brand} = values

    return(
        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={title} className="form-control" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" value={description} className="form-control" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" name="price" value={price} className="form-control" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Shipping</label>
                            <select name="shipping" className="form-control" onChange={handleChange}>
                                <option>Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input type="number" name="quantity" value={quantity} className="form-control" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <select name="color" className="form-control" onChange={handleChange}>
                                <option>Please Select</option>
                                {colors.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}

                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <select name="brand" className="form-control" onChange={handleChange}>
                                <option>Please Select</option>
                                {brands.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select  name="category" className="form-control" type="select" onChange={handleSubChange}>
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c)=>(
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        </div>
                        {showSub && <div>
                            <label>Sub Categories</label>
                            <Select mode="multiple" style={{width:'100%'}}
                            placeholder="Please Select" value={subs}
                            onChange={value => setValues({...values,subs:value})}>
                                {subSelect.length && subSelect.map((s)=>(
                                    <Option key={s._id} value={s._id}>{s.name}</Option>
                            ))}
                            </Select>
                        </div>}
                        <br />
                        <button className="btn btn-outline-info">Save</button>
                    </form>
    )
}

export default ProductCreateForm;