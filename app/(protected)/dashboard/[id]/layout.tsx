// import {
//     dehydrate,
//     HydrationBoundary,
//     QueryClient,
//   } from '@tanstack/react-query' 
//   import React from 'react'
//   import {
//     PrefetchUserAutnomations,
//     PrefetchUserProfile,
//   } from '@/react-query/prefetch'

import InfoBar from "@/components/custom/InfoBar"
import Sidebar from "@/components/custom/Sidebar"

  
  type Props = {
    children: React.ReactNode
    params: { id: string }
  }
  
  const Layout = async ({ children, params }: Props) => {
  
  
    // const query = new QueryClient()
  
    // await PrefetchUserProfile(query)
  
    // await PrefetchUserAutnomations(query)
  
    return (
    //   <HydrationBoundary state={dehydrate(query)}>
        <div className="p-3">
          <Sidebar id={params.id} />
          <div
            className=" lg:ml-[250px] lg:pl-10  lg:py-5  flex  flex-col  overflow-auto ">
            <InfoBar id={params.id} />
            {children}
          </div>
        </div>
    //   </HydrationBoundary>
    )
  }
  
  export default Layout