'use server'

import prisma from "@/lib/prisma" 

export const createUser=async(clerkId:string, firstname:string , lastname:string,email:string )=>{
    const user =await prisma.user.create({
        data:{
            clerkId,firstname,lastname,email,
           
        },
        select:{
            firstname:true,lastname:true
        }
    })
}