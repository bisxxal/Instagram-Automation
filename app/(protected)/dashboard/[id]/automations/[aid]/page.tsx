import Trigger from '@/components/custom/automations/trigger'
import AutomationsBreadCrumb from '@/components/custom/automations/AutomationsBreadCrumb'
import { LucideMessageCircleWarning } from 'lucide-react'
import { getAutomationInfo } from '@/actions/automations' 
import { PrefetchUserAutomation } from '@/query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export async function generateMetadata({params}:{params:{aid:string}}) {
  const info = await getAutomationInfo(params.aid)
  return {
    title:info?.data?.name
  }
}
const page = async({params}:{params:{aid:string}}) => {

  const quary = new QueryClient()
  await PrefetchUserAutomation(quary , params.aid)
  return (
    <HydrationBoundary state={dehydrate(quary)}>
    <div className=' flex flex-col items-center gap-y-20'>
      <AutomationsBreadCrumb id={params.aid}/>
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <LucideMessageCircleWarning />
            When...
          </div>
          {/* <Trigger id={params.aid} /> */}
        </div>
        {/* <ThenNode id={params.id} /> */}
        {/* <PostNode id={params.id} /> */}
    </div>
    </HydrationBoundary>
  )
}

export default page
