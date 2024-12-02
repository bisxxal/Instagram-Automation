import Sidebar from '@/components/custom/Sidebar'
import React from 'react'

interface Props {
  children: React.ReactNode;
  params: {id: string};
}

const page = ({children,params}:Props) => {
  return (
    <div className=' p-3'>
     dashboard page
    </div>
  )
}

export default page
