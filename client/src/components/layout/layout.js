import React from 'react'
import Header from './header'
import Footer from './footer'
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function layout({children,title,description,keywords,author}) {
  return (
    <div>
    <Helmet>
                <meta charSet="utf-8" />
              <div>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords}/>
                <meta name="author" content={author} />
              </div>

                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <Header/>
<main style={{minHeight:'70vh'}}>
<ToastContainer/>
{children}
</main>
    
    
    <Footer/>
    </div>
  )
}

export default layout