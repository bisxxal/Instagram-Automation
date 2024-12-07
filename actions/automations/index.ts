'use server'
 
import prisma from "@/lib/prisma"
import { onCurrentUser } from "../user"
import { CreateAutomation, getAutomations } from "./quries"

export const createAutomations = async(id?:string)=>{
    const user = await onCurrentUser()
    try {
        const craete = await CreateAutomation(user?.id! , id)
 
        if(craete) {
            
           console.log('creating automation' , craete);
            return {status:200 , data:'automation created!'}}

         return{status:404 , data:'Oops something went wrong!'}
    } catch (error) {
        return{status:500 , data:'Internal server error!'}
    }
}
export const getAllAutomations = async()=>{
    const user = await onCurrentUser()
    try {
        const automation = await getAutomations(user?.id!)

        if(automation) return {status:200 , data:automation.automations}

         return{status:404 , data:[]}
    } catch (error) {
        return{status:500 , data:[]}
    }
}

export const getAutomationInfo = async(id:string)=>{
 try {

    await onCurrentUser()
    const automation = await prisma.automation.findUnique({
        where:{id},
        include:{
            keywords:true, triggers:true,posts:true , listener:true,
            User:{
                select:{
                    subscription:true,
                    integrations:true
                }
            }
        } 
    })

    if(automation){
        return {status:200 ,data:automation}
    }
    return {status:404}
} catch (error) {
    return {status:500}
 }
}
export const updateAutomationName = async(automationId:string , data:{name?:string , active?:boolean, automation?:string})=>{
    await onCurrentUser()
    try {
        const update = await prisma.automation.update({
            where:{id:automationId},
            data:{
                name:data.name,
                active:data.active
            }
        })
        
        if(update) return {status:200 , data:'Automation succcessfull updated'}

         return {status:404 , data:'error'} 
    } catch (error) {
        return {status:500 , data:'Internal server error'} 
    }
}
export const saveListener = async(automationId:string, listener:'SMARTAI' | 'MESSAGE' , prompt:string , reply?:string)=>{
    await onCurrentUser()
    try {
        const create = await prisma.automation.update({
            where:{id:automationId},
            data:{
                listener:{
                    create:{
                        listener,
                        prompt,
                        commentReply:reply
                    }
                }
            }
        })
        if(create) return{status:200 , data:'Listiner created'}

        return {status:404 , data:'error'} 
    } catch (error) {
        return {status:500 , data:'Internal server error'} 
    }
}