import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../../context/auth'
import {Select, select} from 'antd'

const {Option}= Select
const AdminOrders = () => {
  const[status,setStatus]=useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
  const [changeStatus,setChangeStatus]= useState('')
  const [orders,setOrders]=useState([])
  const [auth,setAuth]=useAuth()
  const getOrders = async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
      setOrders(data)

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])

  const handleChange=async (orderId,value)=>{
    try{
        const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value})
        getOrders();
    }catch(error)
    {
      console.log(error)
    }
  }
  return (
    <Layout>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'> All orders
        {
          orders?.map((o,i)=>{
            return(
              <div className='border shadow'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>status</th>
                    <th scope='col'>Buyer</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>payment</th>
                    <th scope='col'>quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i+1}</td>
                    <td>
                      <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                      {
                        status.map((s,i)=>(
                          <Option key={i} value={s}>{s}</Option>
                        ))
                      }
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success? "success":'failed'}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              {o?.products?.map((p,i) =>(
                    <div className='row '>
                    <div className='col-md-4'><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width="100px" height="200px" /></div>

                    <div className='col-md-8'>
                    <h4>{p.name}</h4>
                    <p>{p.description.substring(0,30)}</p>
                    <h4>price: {p.price}</h4></div>
                   </div>
                )
                )}
              </div>
            )
          })
        }
        </div>
    </div>
    </Layout>
  )
}

export default AdminOrders