import React from 'react';

const CategoryForm = ({name,SubmitHandler,setName}) => (
    <form onSubmit={SubmitHandler}>
            <label>Enter Category Name</label>
            <div className="form-group">
                <input type="text" className="form-control" value={name} onChange={e => {setName(e.target.value)}} autoFocus/>
                <br/>
                <button className="btn btn-primary" disabled={!name}>Save</button>
            </div>
        </form>
)

export default CategoryForm;