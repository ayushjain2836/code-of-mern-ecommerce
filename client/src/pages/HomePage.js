import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import { useCart } from '../context/cart';
import { Prices } from '../components/Prices';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const [products,setProducts]=useState([])
  const [cart,setCart]=useCart()
  const [categories,setCategories]=useState([])
const [checked,setChecked]= useState([])
const [radio,setRadio]= useState([])
const [total,setTotal]=useState(0)
const [page,setPage]=useState(1)
const [loading,setLoading]=useState(false)
const navigate=useNavigate()
  //get all cattegory
  const getAllCategory=async()=>{
    try{
      const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      console.log(data)
      if(data?.success){
        setCategories(data.category)
        
      }
    }catch(error){
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[])
  //get products
  const getAllProducts= async()=>{
    try{
      setLoading(true)
     const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
     setLoading(false)
     setProducts(data.products);
    }catch(error)
    {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[]);

  //loadmore
  const loadMore = async()=>{
    try{
      setLoading(true)
      const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    }catch(error){

      console.log(error)
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(page===1) return;
    loadMore()
  },[page]);
//gttotal count
const getTotal =async()=>{
  try{
    const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
    setTotal(data?.total)
  }catch(error){
    console.log(error)
    
  }

}
useEffect(()=>{
  getAllCategory();

  getTotal()
},[])
  //filter by cat
  const handleFilter=(value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id)
    }
    else{
      all=all.filter((c)=>c!== id)
    }
    setChecked(all);
  }
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts();
   
  },[checked.length,radio.length])
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct()
    //eslint-disable-next-line
  },[checked,radio])
  //get fillterd product 
  const filterProduct = async ()=>{
    try{
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`,{checked,radio})
      setProducts(data?.products)
    }catch(error){
      console.log(error)
    }
  }
    return (
    
    <Layout title={"all-products-best offers"}>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <h4 className='text-center'>Filter by categories</h4>
            <div className='d-flex flex-column'>
            {categories?.map(c=>(
              <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)}>
              {c.name}
              </Checkbox>
            ))}
          </div>
          {/*prices category*/} 

          <h4 className='text-center mt-4'>Filter by Prices</h4>
            <div className='d-flex flex-column'>
           <Radio.Group onChange={e=>setRadio(e.target.value)}>
            {Prices?.map(p=>(
              <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
              </div>))}
           </Radio.Group>

          </div>
          <div className='d-flex flex-column'>
           <button className='btn btn-danger' onClick={()=>window.location.reload()}>RELOAD</button>
           
          </div>
          </div>
          <div className='col-md-9'>
          {JSON.stringify(radio,null,4)}
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
          {products?.map(p=>(<div className="card m-2" style={{width: '18rem'}} >
  <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}...</p>
    
    <p className="card-text">Rs. {p.price}</p>
    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
    <button className="btn btn-secondary ms-1" onClick={()=> {setCart([...cart,p]) ;
    localStorage.setItem('cart',JSON.stringify([...cart,p]))
    toast.success('item added to cart')}}>Add to cart</button>

  </div>
</div>
               
))}
          </div>
          <div className='m-2 p-3'>{products&&products.length<total &&(<button className='btn btn-warning' onClick={(e)=>{e.preventDefault(); setPage(page+1)}}>{loading?"loading...":"loadmore"}</button>)}</div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage