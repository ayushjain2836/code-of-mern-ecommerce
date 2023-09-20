import React, { useState ,useEffect} from 'react'
import Layout from '../components/layout/layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import axios from 'axios'
import DropIn from 'braintree-web-drop-in-react'
import { useNavigate } from 'react-router-dom'
import Item from 'antd/es/list/Item'
const CartPage = () => {
    const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()
    const [clientToken,setClientToken]=useState("")
    const navigate=useNavigate()
    const [instance,setInstance]=useState('')
    const[loading,setloading]= useState(false)
    const handlePayment=async()=>{
        try{
            setloading(true)
            const {nonce}=await instance.requestPaymentMethod()
            const{data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
                nonce,cart
            })
            setloading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate("/dashboard/user/orders")
        }catch(error){
           console.log(error)
        }
    }
//total price
const totalPrice=()=>{
   try{  
    let total=0;
    cart?.map((item)=>{
        total=total+ item.price
    })
    return total;
} catch(error)
{
    console.log(error)
}
}

    //delete

    const removeCartItem = (pid)=>{
        try{

            let myCart=[...cart]
            let index= myCart.findIndex((item)=>item._id===pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart));
        }
        catch(error){
            console.log(error)
        }
    }
    //get payment gateway token
    const getToken =async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{getToken()},[auth?.token])
  return (
    <Layout><div className='container'>
    <div className='row'>
        <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'>
            {`hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
            {cart?.length 
            ? `you have ${cart.length} items in your cart ${auth?.token ? "": "please login to checkout"}` :"your cart is empty"} </h4>
        </div>
    </div>
    <div className='row'>
        <div className='col-md-7'>
            <div className='row mb-2 card flex-row'>
                {cart?.map(p =>(
                    <div className='row '>
                    <div className='col-md-4'><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width="100px" height="200px" /></div>

                    <div className='col-md-8'>
                    <h4>{p.name}</h4>
                    <p>{p.description.substring(0,30)}</p>
                    <h4>price: {p.price}</h4></div>
                    <button className='btn btn-danger m-2' onClick={()=>removeCartItem(p._id)}>remove</button>
                    </div>
                )
                )}
            </div>
        </div>
        <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total| checkout | Payment</p>
            <hr/>
            <h4>Total: {totalPrice()} </h4>
            {auth?.user?.address ?(
                <div className='mb-3'>
                <h4>Current address</h4>
                <h5>{auth?.user?.address}</h5>
                <button  onClick={()=>navigate('/dashboard/user/profile')} className='btn btn-outline-warning'>Update address</button>
                </div>
            ):(
                <div className='mb-3'>
                    {auth?.token?(<button className='btn btn-outline-warning' onClick={()=> navigate('/dashboard/user/profile')}>Update address</button>):(
                        <button className='btn btn-outline-warning' onClick={()=> navigate('/login')}>please login to checkout</button>
                    )}
                </div>
             )}
             <div className='mt-2'>
             {
                !clientToken || !cart.length? (''):(<>
                    <DropIn options={ {authorization: clientToken,
                                    paypal:{
                                        flow:'vault'
                                    },}}
                                        onInstance={instance=>setInstance(instance)}
                                    />
                                    <button className='btn btn-primary' onClick={handlePayment} >Make payment</button>
                </>)
             }
               
             </div>
        </div>
    </div>
    </div></Layout>
  )
}

export default CartPage