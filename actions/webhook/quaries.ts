'use server'

import prisma from "@/lib/prisma"

export const matchKeyword = async (text: string) => {   
 
    return await prisma.keyword.findFirst({
        where: {
            word:{
                equals: text,
                mode: 'insensitive'
            }
        }
    })
    
}
 
export const getKeywordAutomation = async (
    automationId: string,
    dm: boolean
  ) => {
    return await prisma.automation.findUnique({
      where: {
        id: automationId,
      },
  
      include: {
        dms: dm,
        triggers: {
          where: {
            type: dm ? 'DM' : 'COMMENT',
          },
        },
        listener: true,
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
            integrations: {
              select: {
                token: true,
              },
            },
          },
        },
      },
    })
  }