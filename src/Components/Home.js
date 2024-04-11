
import React from 'react'
import SideNavbar from '../Layouts/SideNavbar'
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <div>  
       <div style={{ gap: "60px" }} className='d-flex justify-content-start flex-row'>
         <div className=''>
           <SideNavbar />
         </div>
         <div className='tab-large-screen'>
           <Dashboard />
         </div>
       </div>
    </div>
  )
}

export default Home
