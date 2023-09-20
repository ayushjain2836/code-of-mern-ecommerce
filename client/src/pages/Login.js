import React,{useState} from 'react'
import Layout from '../components/layout/layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate ,useLocation} from "react-router-dom";
import { useAuth } from '../context/auth';
    
  
    
const Login = () => {
   const location = useLocation();
    const navigate = useNavigate();
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [auth,setAuth]= useAuth()
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        if(res.data.success){
            toast.success(res.data.message)
            setAuth({
              ...auth,user:res.data.user,
              token: res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            
            navigate(location.state || "/");
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
    <h1>Login page</h1>
    <form onSubmit={handleSubmit}>
  
    <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Email' required/>
    </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password' required/>
  </div>
  <div className='mb-3'> <button type="button" onClick={()=>{navigate('/forgot-password')}} className="btn btn-primary">forgotpassword</button>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>

</form>

    </div>
    </Layout>
  )
}

export default Login