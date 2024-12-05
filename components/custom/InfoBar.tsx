'use client'
import { PAGE_BREAD_CRUMBS, SIDEBAR_MENU } from "@/constants/menu"
import { usePaths } from "@/hooks/use-path"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ClerkAuthState from "./ClerkAuthState"
import { IoHelpCircle } from "react-icons/io5";
import UpgradeCard from "./Upgrade"
import { Bell, Menu, SearchIcon } from "lucide-react"
import Sheet from "./Sheet"
import CreateAutomation from "./CreateAutomation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import MainBreadCrumb from "./MainBreadCrumb"
 
const InfoBar = ({id}:{id:string}) => {
  const { page } = usePaths()
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == id
  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet
              trigger={<Menu />}
              className="lg:hidden"
              side="left"
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
            </Sheet>
          </span>
         {/* <Search /> */}
         <div className="flex overflow-hidden gap-x-2 border-[1px] border-[#3352CC] rounded-full px-4 py-1 items-center flex-1">
      <SearchIcon color="#3352CC" />
      <Input
        placeholder="Search by name, email or status"
        className="border-none outline-none ring-0 focus:ring-0 flex-1"
      />
    </div>
          <CreateAutomation />
          <Button className="bg-white rounded-full py-6">
      <Bell
        color="#3352CC"
        fill="#3352CC"
      />
    </Button>
        </div>
        <MainBreadCrumb
          page={page === id ? 'Home' : page}
          id={id}
        />
      </div>
    )
  )
}

export default InfoBar
