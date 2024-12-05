'use server'
import prisma from "@/lib/prisma"
 
export const updateIntegration =async(token:string, expire:Date,id:string)=>{
    return await prisma.integrations.update({
        where:{id},
        data:{
            token,expireAt:expire
        }
    })
}