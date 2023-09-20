import React from 'react'
import Layout from '../components/layout/layout'
import {MdEmail} from 'react-icons/md'
import {AiOutlinePhone} from 'react-icons/ai'
function Contact() {
  return (
    <Layout title='contact us'>
    <div className='row aboutus'>
      <div className='col-md-1'></div>
        <div className='col-md-6'>
          <img src='/images/contactus.jpeg' alt='contactus' style={{width:"100%"}}></img>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark text-white'>CONTACT US</h1>
          <p className='text-justify mt-2'>for any querry plz contact to any contact which is given below</p>
          <p className='mt-3'>
          <MdEmail/>    ayushjain2836@gmail.com
          </p>
          <p className='mt-3'>
          <AiOutlinePhone/>   9898848888
          </p>
          

        </div>
      </div> 
    </Layout>
  )
}

export default Contact