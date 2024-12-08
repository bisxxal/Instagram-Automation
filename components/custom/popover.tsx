 
import { cn } from '@/lib/utils'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

type Props = {
  trigger: JSX.Element
  children: React.ReactNode
  className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn('bg-[#1D1D1D] shadow-lg rounded-xl', className)}
        align="end"
        side="bottom"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default PopOver