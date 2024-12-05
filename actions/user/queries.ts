'use server'

import prisma from "@/lib/prisma"
 
export const findUser = async (clerkId:string) => {
    try {
        return await prisma.user.findUnique({   
            where: {
                clerkId
            },
            include: {
                subscription: true,
                integrations: {
                  select: {
                    id: true,
                    token: true,
                    expiresAt: true,
                    name: true,
                  },
                },
              },    
        })

    } catch (error) {
        
    }
}

export const createUser=async(clerkId:string, firstname:string , lastname:string,email:string )=>{
    const user =await prisma.user.create({
        data:{
            clerkId,firstname,lastname,email,
            subscription:{
                create:{}
            }
        },
        select:{
            firstname:true,lastname:true
        }
    })
}