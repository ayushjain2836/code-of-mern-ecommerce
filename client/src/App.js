import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/about'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Register'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Dashboard from './user/Dashboard';
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './pages/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashBoard from './pages/Admin/AdminDashBoard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from './pages/Admin/Users'
import Orders from './user/Orders'
import Profile from './user/Profile'
import Products from './pages/Admin/Products'
import UpdatedProduct from './pages/Admin/UpdatedProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'
function App() {
  ///dashboard/user/orders
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/search' element={<Search/>}/>
      
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashBoard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      
      <Route path='admin/orders' element={<AdminOrders/>}/>
      <Route path='admin/product/:slug' element={<UpdatedProduct/>}/>
      <Route path='admin/products' element={<Products/>}/>
      <Route path='admin/users' element={<Users/>}/>
      </Route>
      
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      
      
    </Routes>
    
    
    </>
  )
}

export default App;
