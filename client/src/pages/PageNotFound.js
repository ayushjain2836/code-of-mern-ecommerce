import React from 'react'
import Layout from '../components/layout/layout'
import {Link} from 'react-router-dom'
function PageNotFound() {
  return (
    <Layout>
      <div className='pnf'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>oops! page not found</h2>
      <Link to='/' className='pnf-btn'>
        go back
      </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound