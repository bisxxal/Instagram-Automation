'use client'
import { SIDEBAR_MENU } from "@/constants/menu"
import { usePaths } from "@/hooks/use-path"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ClerkAuthState from "./ClerkAuthState"
import { IoHelpCircle } from "react-icons/io5";
import UpgradeCard from "./Upgrade"
 
type Props = {
  id: string
}

const Sidebar = ({ id }: Props) => {
  const { page } = usePaths()

  return (
    <div
      className="w-[250px] border-[1px] radial fixed left-0 lg:inline-block border-[#545454] bg-gradient-to-b from-[#768BDD]  via-[#171717] to-[#768BDD]  hidden  bottom-0  top-0  m-3  rounded-3xl  overflow-hidden"
    >
      <div
        className="flex flex-col gap-y-5w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
        <div className="flex gap-x-2 items-center p-5 justify-center">
         <h1 className=" text-2xl font-bold">Automater</h1>
        </div>
        <div className="flex flex-col py-3">
      { SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${id}/${item.label === 'home' ? '/' : item.label}`}
      className={cn( 'capitalize flex gap-x-2 items-center rounded-full p-3', page === item.label && 'bg-[#0f0f0f]', page === id && item.label === 'home'   ? 'bg-[#0f0f0f]'   : 'text-[#9B9CA0]')}>
      {item.icon}
      {item.label}
    </Link>
  ))}
        </div>
        <div className="px-16">
          {/* <Separator
            orientation="horizontal"
            className="bg-[#333336]"
          /> */}
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex items-center gap-x-3">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>
          <div className="text-[#9B9CA0] items-center flex gap-x-3"> 
             <IoHelpCircle size={23} />
            <p className="">Help</p>
          </div>
        </div>
        {/* <SubscriptionPlan type="FREE"> */}
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        {/* </SubscriptionPlan> */}
      </div>
    </div>
  )
}

export default Sidebar