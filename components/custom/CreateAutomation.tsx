'use client'
import React, { useMemo } from 'react'
import { Button } from '../ui/button'
import Loader from './loader'
import { MdAutoGraph } from "react-icons/md";
import { useCreateAutomation } from '@/hooks/use-automation';
import { v4 } from 'uuid';

const CreateAutomation = () => {
  const mutationId = useMemo(() => v4(), [])
  const {isPending , mutate} = useCreateAutomation(mutationId)
  return (
    <Button
    className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
    onClick={()=>mutate({name:'Untitled' , id:mutationId , createdAt: new Date(),
      keywords: []} )}
  >
    <Loader state={isPending}>
    <MdAutoGraph size={35}/>
      <p className="lg:inline hidden">Create an Automation</p>
    </Loader>
  </Button>

  )
}

export default CreateAutomation