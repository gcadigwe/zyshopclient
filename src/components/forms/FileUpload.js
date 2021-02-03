import axios from 'axios';
import React from 'react';
import Resizer from 'react-image-file-resizer'
import {useSelector} from 'react-redux'
import {Avatar,Badge} from 'antd'

const FileUpload = ({values,setValues,setLoading}) => {

    const {Auth} = useSelector((state)=>({...state}))

    const FileUploadChange = (e) => {
        let files = e.target.files
        let alluploadedfiles = values.images
        if(files){
            setLoading(true)
            for(let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i],720,720,'JPEG',100,0,(uri)=>{
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image:uri},{
                        headers:{
                            authtoken: Auth.token
                        }
                    }).then((res)=>{
                        console.log("IMAGE UPLOAD DATA ===> ",res)
                        setLoading(false)
                        alluploadedfiles.push(res.data)
                        setValues({...values,images:alluploadedfiles})
                    }).catch((err)=>{
                        setLoading(false)
                        console.log("CLOUDINARY ERROR ===> ",err)
                    })
                },'base64')
            }
        }
    }

    const imageremove = (id) => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id:id},{
            headers:{
                authtoken: Auth.token
            }
        }).then((res)=>{
            setLoading(false)
            const {images} = values
            const filteredimages = images.filter((item)=>{
                return item.public_id !== id
            })
            setValues({...values,images:filteredimages})
        }).catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    }

    return(
       <>

        <div className="row">
            {values.images && values.images.map((i)=>(
                <Badge count="x" key={i.public_id} onClick={()=>imageremove(i.public_id)} style={{cursor:"pointer"}}>
                    <Avatar src={i.url}  size={120} shape="square" className="m-3"/>
                </Badge>
            ))}
        </div>


         <div className="row">
            <label className="btn btn-primary btn-raised">Choose File
            <input hidden type="file" multiple accept="images/*" onChange={FileUploadChange} />
            </label>
        </div>
       </>
    )
}

export default FileUpload;