import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import { toast } from 'react-toastify'
import {Select} from 'antd'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import AdminMenu from '../../components/layout/AdminMenu'

const UpdatedProduct = () => {
    const {Option}= Select;
  const [categories,setCategories]=useState([])
  const [photo,setPhoto]= useState("")
  const [name,setName]= useState("")
  const [description,setDescription]= useState("")
  const [price,setPrice]= useState("")
  const [category,setCategory]= useState("")
  const [quantity,setQuantity]= useState("")
  const [shipping,setShipping]= useState("")
  const [id,setId]=useState('')
  const navigate=useNavigate()
 const params=useParams()

  //gey single pproduct
const getSingleProduct = async ()=>{
  try{
    const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
    setName(data.product.name);
    setDescription(data.product.description)
    setPrice(data.product.price)
    setId(data.product._id)
    setQuantity(data.product.quantity)
    setShipping(data.product.shipping)
    setCategory(data.product.category._id)
  }catch(error){
    console.log(error)
  }
}

useEffect (()=>{
  getSingleProduct()
  // eslint-disable-next-line
},[])
//get all category
const getAllCategory=async()=>{
  try{
    const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
    console.log(data)
    if(data?.success){
      setCategories(data?.category)
      
    }
  }catch(error){
    console.log(error)
    toast.error('something went wrong in getting category')
  }
}
useEffect(()=>{
  getAllCategory();
},[])
const handleUpdate =async(e)=>{
  e.preventDefault()
  try{ 
    const productData= new FormData()
    productData.append("name",name);
    productData.append("description",description);
    productData.append("price",price);
    productData.append("quantity",quantity);
     photo && productData.append("photo",photo);
    productData.append("category",category);
    const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,productData);
    if(data?.success){
      toast.success("product updated successfully")
      navigate('/dashboard/admin/products')
    }
    else{
      toast.error(data?.message)
    }
  }catch(error)
  {
    console.log(error)
    toast.error("something went wrong")
  }
}

// delete product
const handleDelete= async()=>{
  try{
    let answer= window.prompt('are you sure you want to delete this product')
    if(!answer) return;
    const {data}= axios.delete(`${process.env.REACT_APP_API}/api/v1/product/product-delete/${id}`)
    toast.success("product deleted successfully")
    navigate('/dashboard/admin/products')
  }catch(error)
  {
    console.log(error)
    toast.error('something went wrong')
  }
}
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'><h1>Update Product</h1>
        <div className='m-1'>

          <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
          {console.log(category)}
          {categories?.map(c=>(
            <Option key={c._id} value={c._id}>{c.name}</Option>
          ))}

          </Select>
          <div className='mb-3'>
          <label className='btn btn-outline-secondary col-md-12'>
          {photo? photo.name: "Upload photo"}
          <input type='file' name='photo' accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
              </label>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
          </div>
          <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping? "yes": "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleUpdate}>Update PRODUCT</button>
                <button className='btn btn-danger' onClick={handleDelete}>Delete PRODUCT</button>
              </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default UpdatedProduct