import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashBoard = () => {
  const [Auth]=useAuth();
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className="row">
      <div className='col-md-3'>
        <AdminMenu/>
      </div>
      <div className='col-md-9'>
        <div className='card w-75 p-3'>
          
          <h3>Admin Name: {Auth?.user?.name}</h3>
          <h3>Admin Email: {Auth?.user?.email}</h3>
          <h3>Admin Phone: {Auth?.user?.phone}</h3>
         
        </div>
      </div>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashBoard