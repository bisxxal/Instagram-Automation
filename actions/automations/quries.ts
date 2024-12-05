'use server'

import prisma from "@/lib/prisma"

export const CreateAutomation = async(clerkId:string)=>{
  const auto = await prisma.user.update({
    where: {
        clerkId,
      },
      data: {
        automations: {
        //   create: {
        //     // ...(id && { id }),
        //   },
        },
      },

  })
  return auto;
}

export const getAutomations = async(clerkId:string)=>{
     return await prisma.user.findUnique({
      where:{
        clerkId
      },
      select:{
        automations:{orderBy:{createdAt:'asc'},
        include:{keywords:true , listener:true}
      }
      }
     })
}