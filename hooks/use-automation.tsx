import {z} from 'zod'
import { createAutomations, saveListener, updateAutomationName,saveTrigger, saveKeyword, deleteKeyword, savePosts } from "@/actions/automations"
import { useMutatioinData } from "./use-mutation-data"
import { useEffect, useRef, useState } from "react"
import useZodForm from './use-zod-form'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { TRIGGER } from '@/redux/slice/automation'
 
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

export const useTriggers = (id:string)=>{
  const types = useAppSelector((state)=>state.AutmationReducer.trigger?.types)

  const dispatch = useDispatch()
  const onSetTrigger = (type:"COMMENT" | "DM") =>dispatch(TRIGGER({trigger:{type}}))
  
  const {isPending , mutate} = useMutatioinData(['add-trigger'] , (data:{types:string[]})=>saveTrigger(id, data.types)  , 'automation-info')
  const onSaveTrigger = ()=> mutate({types})

  return { types , onSetTrigger , onSaveTrigger , isPending}
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

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState('')
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value)

  const { mutate } = useMutatioinData(
    ['add-keyword'],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    'automation-info',
    () => setKeyword('')
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ keyword })
      setKeyword('')
    }
  }

  const { mutate: deleteMutation } = useMutatioinData(
    ['delete-keyword'],
    (data: { id: string }) => deleteKeyword(data.id),
    'automation-info'
  )

  return { keyword, onValueChange, onKeyPress, deleteMutation }
}

export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postid: string
      caption?: string
      media: string
      mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
  >([])

  const onSelectPost = (post: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postid === post.postid)) {
        return prevItems.filter((item) => item.postid !== post.postid)
      } else {
        return [...prevItems, post]
      }
    })
  }

  const { mutate, isPending } = useMutatioinData(
    ['attach-posts'],
    () => savePosts(id, posts),
    'automation-info',
    () => setPosts([])
  )
  return { posts, onSelectPost, mutate, isPending }

}