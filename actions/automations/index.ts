'use server'
 
import prisma from "@/lib/prisma"
import { onCurrentUser } from "../user"
import { CreateAutomation, getAutomations } from "./quries"
import { findUser } from "../user"

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
export const saveTrigger = async(automationId:string , trigger:string[])=>{
    await onCurrentUser()
    try {
        if(trigger.length === 2){
            const create = await prisma.automation.update({
                where:{id:automationId},
                data:{
                    triggers:{
                        createMany:{
                            data:[{type:trigger[0]} , {type:trigger[1]}],
                        },
                    },
                },
            })
            if(create) return{status:200 , data:'trigger created'}
            return {status:404 , data:'Cannot save trigger'} 
        }
        else{
            const create = await prisma.automation.update({
                where:{id:automationId},
                data:{
                    triggers:{
                        create:{
                            type:trigger[0],
                        },
                    },
                },
            })
            if(create) return{status:200 , data:'trigger created'}
            return {status:404 , data:'Cannot save trigger'} 
        }
         
    } catch (error) {
        console.log('erorr in trigger ' , error);
        
        return {status:500 , data:'Internal server error'}
    }
}

export const saveKeyword = async(id:string , keyword:string)=>{
   await onCurrentUser()
   try {
    const create = await prisma.automation.update({
        where:{id},
        data:{
            keywords:{
                create:{
                    word:keyword
                }
            }
        }
    })
    if(create) return{status:200 , data:'keyword created'}
    return {status:404 , data:'Cannot add this keyword'} 
   } catch (error) {
    console.log("error in saved keyword" , error);
    return {status:500 , data:'Internal server error'}
   }
}

export const deleteKeyword = async(id:string)=>{
    await onCurrentUser()
    try {
        const deleteKeyword = await prisma.keyword.delete({
            where:{id}
        })
        if(deleteKeyword) return{status:200 , data:'keyword deleted'}
        return {status:404 , data:'Cannot delete this keyword'} 
    } catch (error) {
        return {status:500 , data:'Internal server error'}
    }
}

export const getProfilePosts = async()=>{
  const user = await onCurrentUser()
    try {
        const profile = await findUser(user?.id!)
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )
    const parsed = await posts.json()
    if (parsed) return { status: 200, data: parsed }
    console.log('🔴 Error in getting posts')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 server side Error in getting posts ', error)
    return { status: 500 }
    }
} 

export const savePosts = async(automationId:string , posts:{postid: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM";
}[])=>{
    await onCurrentUser()
    try {
      const create = await prisma.automation.update({
        where: { id: automationId },
        data: {
          posts: {
            createMany: {
              data: posts,
            },
          },
        },
      })
  
      if (create) return { status: 200, data: 'Posts attached' }
  
      return { status: 404, data: 'Automation not found' }
    } catch (error) {
        console.log('error in saving posts' , error);
        
      return { status: 500, data: 'Oops! something went wrong' }
    }

}

export const activateAutomation = async(automationId:string , active:boolean)=>{
    await onCurrentUser()
    try {
      const update = await prisma.automation.update({
        where: { id: automationId },
        data: {
          active,
        },
      })
      if (update)
        return {
          status: 200,
          data: `Automation ${active ? 'activated' : 'disabled'}`,
        }
      return { status: 404, data: 'Automation not found' }
    } catch (error) {
        console.log('error in active automation' , error);
        
      return { status: 500, data: 'Oops! something went wrong' }
    }
}