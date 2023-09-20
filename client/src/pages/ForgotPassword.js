import React,{useState} from 'react'
import Layout from '../components/layout/layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
    
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email,setEmail]= useState("")
    const [newPassword,setNewPassword]= useState("")
    const [answer,setAnswer]= useState("")
    
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
       
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer});
        if(res.data.success && res){
            toast.success(res.data.message && res.data)
           
           
            
            navigate( "/login");
        }else{
            toast.error(res.data.message)
        }
      }catch(error){
        console.log(error);
        toast.error("something went wrong")
      }}
    
  return (
    <Layout>
        <div className='register'>
    <h1>reset password</h1>
    <form onSubmit={handleSubmit}>
  
    <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Email' required/>
    </div>
  <div className="mb-3">
    <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='new Password' required/>
  </div>
  
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputanswer1" placeholder='enter favirate support' required/>
    </div>
  <button type="submit" className="btn btn-primary">reset password</button>

</form>

    </div>
    </Layout>
  )
}

export default ForgotPassword