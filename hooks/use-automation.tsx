import {z} from 'zod'
import { createAutomations, saveListener, updateAutomationName } from "@/actions/automations"
import { useMutatioinData } from "./use-mutation-data"
import { useEffect, useRef, useState } from "react"
import useZodForm from './use-zod-form'
 
export const useCreateAutomation = (id?:string)=>{
    const {mutate , isPending} = useMutatioinData(['create-automation'] , ()=>createAutomations(id) ,'user-automations')

    return {mutate , isPending}
}

export const useEditAutomation = (automationId :string)=>{
  const [edit  , setEdit ] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = ()=>setEdit(true)
  const disableEdit = ()=>setEdit(false)
 
const { isPending, mutate } = useMutatioinData(
    ['update-automation'],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    'automation-info',
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return { edit, enableEdit, disableEdit, inputRef, isPending, }
}

export const useTriggers = ()=>{
  
}

export const useListener = (id:string)=>{
  const [listner ,setListener] = useState<"MESSAGE" | "SMARTAI">('MESSAGE')

  const promotSchema = z.object({
    prompt:z.string().min(1),
    reply:z.string()
  })

  const {isPending ,mutate} = useMutatioinData(['create-listner'] , (data:{prompt:string , reply:string})=>
    saveListener(id , listner ||'MESSAGE' , data.prompt , data.reply)
    ,'automation-info' )

    const { register, errors, onFormSubmit, watch, reset,} = useZodForm( promotSchema , mutate)

    const onSetListener = (type:"SMARTAI" | "MESSAGE") =>setListener(type)

    return {onSetListener , register , onFormSubmit , listner , isPending}
}