import Navbar from '@/components/common/Navbar'
import React from 'react'



const layout = async ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Navbar/>
      
    
        {children}              
    </div>
  )
}

export default layout
