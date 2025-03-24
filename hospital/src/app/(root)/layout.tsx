import React from 'react'
import Navbar from '../components/common/Navbar'


const layout = async ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
      
    
        {children}              
    </div>
  )
}

export default layout
