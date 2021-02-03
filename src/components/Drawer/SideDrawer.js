import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Drawer,Button} from 'antd'


const SideDrawer = () => {
    const dispatch = useDispatch()
    const {drawer,Cart} = useSelector((state)=>({...state}))

    return (
        <Drawer title={`Cart / ${Cart.length} Products`} onClose={()=>dispatch({
            type:"SET_VISIBLE",
            payload:false
        })} visible={drawer}>
            {Cart.map(p => (
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images && (
                            <>
                                <img src={p.images[0].url} style={{width:"100%",height:"50px",objectFit:"cover"}} />
                                <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Link to="/cart" >
                <button className="btn text-center btn-primary btn-raised btn-block" onClick={()=>dispatch({
                    type:"SET_VISIBLE",
                    payload:false
                })}>Go To Cart</button>
            </Link>
        </Drawer>
    )
}


export default SideDrawer;