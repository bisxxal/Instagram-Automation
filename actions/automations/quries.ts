'use server'
import prisma from "@/lib/prisma"
 
export const CreateAutomation = async (clerkId: string, id?: string) => {
  try {
    const auto = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        automations: {
          create: { 
            ...(id && { id }),
            name:"Untitled"
          },
        },
      },
    });
    return auto;
  } catch (error) {
    console.error("Error creating automation:", error);
    throw error;
  }
};


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
export const findAutomation = async (id: string) => {
  return await prisma.automation.findUnique({
    where: {
      id,
    },
    include: {
      keywords: true,
      triggers: true,
      posts: true,
      listener: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  })
}