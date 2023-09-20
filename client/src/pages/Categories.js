import Layout from '../components/layout/layout'
import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
    const categories = useCategory()
  return (
    <Layout>
    <h1>ALL categories</h1>
    <div className='row'>
    {categories.map((c)=>(
        <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
            <button className='btn btn-primary text-light'><Link className='btn btn primary' to={`/category/${c.slug}`}>{c.name}</Link></button>
        </div>))}
    </div>
    </Layout>
  )
}

export default Categories