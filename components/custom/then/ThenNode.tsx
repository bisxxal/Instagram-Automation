'use client'
import { useQueryAutomation } from '@/hooks/use-quries'
import React from 'react'
import { LuMessageCircle } from "react-icons/lu";
import { HiPaperAirplane } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import PostButton from '../post/PostButton';
import { Separator } from '../Separator';
const ThenNode = ({id}:{id:string}) => {
  const { data } = useQueryAutomation(id)
  const commentTrigger = data?.data?.triggers.find((t) => t.type === 'COMMENT')
  
  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-x-2">
      <LuMessageCircle size={22} />
        Then...
      </div>
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listener.listener === 'MESSAGE' ? (
            <HiPaperAirplane />
          ) : (
            <RiRobot2Line />
          )}
          <p className=" text-lg">
            {data.data.listener.listener === 'MESSAGE'
              ? 'Send the user a message.'
              : 'Let Smart AI take over'}
          </p>
        </div>
        <p className="flont-light text-text-secondary">
          {data.data.listener.prompt}
        </p>
      </div>
      {data.data.posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
          <>
         <PostButton id={id} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ThenNode
