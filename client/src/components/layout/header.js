import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import {FaShoppingBag } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import { Badge } from 'antd'
import { useCart } from '../../context/cart'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
function Header() {
  const[auth,setAuth]=useAuth();
  const [cart]=useCart()
  const categories=useCategory()
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:''
    })
    localStorage.removeItem('auth')
      toast.success('logout sucessful')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <NavLink to='/'className="navbar-brand" ><FaShoppingBag/>ecommerce</NavLink>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <SearchInput/>
        <li className="nav-item">
          <NavLink to='/'className="nav-link 
          " aria-current="page" >Home</NavLink>
        </li>

        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to={"/categories"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Category
  </Link>
  <ul className="dropdown-menu">
  <li><Link to={"/categories"} className="dropdown-item" >ALL CATEGORY</Link></li>
  {categories?.map((c)=>
  ( 
    <li><Link to={`/category/${c.slug}`} className="dropdown-item" >{c.name}</Link></li>
    
  )
  )}
  </ul>
</li>



       


        {
          !auth.user ? (<><li className="nav-item">
          <NavLink to='/register'className="nav-link" >REGISTER</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >LOGIN</NavLink>
        </li></>):(<>
          <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${auth?.user?.role=== 1 ?'admin' : 'user'}`} className="dropdown-item" >dashboard</NavLink></li>
  
  <li className="nav-item">
          <NavLink onClick={handleLogout} to='/login'className="nav-link" >LOGOUT</NavLink>
        </li>
        </ul>
</li>

       </>)
        }



        <li className="nav-item">
        <Badge count= {cart?.length} showZero>
        <NavLink to='/cart'className="nav-link" >Cart</NavLink>
    </Badge>
         
        </li>
      </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Header