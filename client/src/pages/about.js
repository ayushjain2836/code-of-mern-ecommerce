import React from 'react'
import Layout from '../components/layout/layout'

function about() {
  return (
    <Layout title={'about us|ecoomercs'}>
      <div className='row about'>
        <div className='col-md-6'>
          <img src='/images/about.jpeg' alt='about'></img>
        </div>
        <div className='col-md-4'>
        <h1 className='bg-black text-white justify-content'>ABOUT US</h1>
        To obtain an entry-level position as a software Engineer, allowing me to utilize my education and internship
experience while gaining valuable work experience in a team oriented environment.
        </div>
      </div>
    </Layout>
  )
}
Layout.defaultProps={
  title:'shop ecommerce app',
  description:"mern stack project",
  keywords:'mern,react,node,mongodb',
  author: 'ayush jain'

}
export default about