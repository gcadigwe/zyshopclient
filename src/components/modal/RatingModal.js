import React,{useState} from 'react'
import {Modal,Button} from 'antd'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify'
import {useHistory,useParams} from 'react-router-dom'

const RatingModal = ({children}) => {
    const [ModalVisible,setModalVisible] = useState(false)
    const {Auth} = useSelector(state => ({...state}))

    let history = useHistory()
    
    let {slug} = useParams()
    //Ok handler

    const handleOk = () => {
        setModalVisible(false)
    }

    //cancel handler
    const handleCancel = () => {
        setModalVisible(false)
    }

    const handleSubmit = () => {
        if (Auth && Auth.token){
            setModalVisible(true)
        }else {
            history.push({
                pathname: "/login",
                state: {from:`/product/${slug}`}
            })
        }
    }

    return (
        <>
        <div onClick={handleSubmit}>
            <StarOutlined className="text-danger" /> <br />{Auth ? "Leave Rating" : "Login To Leave A Raring"}   
         </div>

         <Modal title="Leave A Rating" centered onCancel={handleCancel} visible={ModalVisible} onOk={handleOk}>
            {children}
         </Modal>
         </>
        )
}
export default RatingModal;