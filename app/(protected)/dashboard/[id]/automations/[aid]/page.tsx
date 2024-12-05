import Trigger from '@/components/custom/automations/trigger'
import AutomationsBreadCrumb from '@/components/custom/AutomationsBreadCrumb'
import { LucideMessageCircleWarning } from 'lucide-react'

const page = ({params}:{params:{aid:string}}) => {
  return (
    <div className=' flex flex-col items-center gap-y-20'>
      <AutomationsBreadCrumb id={params.aid}/>
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <LucideMessageCircleWarning />
            When...
          </div>
          <Trigger id={params.aid} />
        </div>
        {/* <ThenNode id={params.id} /> */}
        {/* <PostNode id={params.id} /> */}
    </div>
  )
}

export default page
