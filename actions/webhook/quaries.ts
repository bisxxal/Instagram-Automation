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

  export const trackResponses = async (automationId: string,  type: 'COMMENT' | 'DM') => {
    if (type === 'COMMENT') {
        return await prisma.listener.update({
          where: { automationId },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        })
    }
    if (type === 'DM') {
        return await prisma.listener.update({
          where: { automationId },
          data: {
            dmCount: {
              increment: 1,
            },
          },
        })
      }

  }


export const createChatHistory = (
    automationId: string,
    sender: string,
    reciever: string,
    message: string
  ) => {
    return prisma.automation.update({
      where: {
        id: automationId,
      },
      data: {
        dms: {
          create: {
            reciever,
            senderId: sender,
            message,
          },
        },
      },
    })
  }
  
  export const getKeywordPost = async (postId: string, automationId: string) => {
    return await prisma.post.findFirst({
      where: {
        AND: [{ postid: postId }, { automationId }],
      },
      select: { automationId: true },
    })
  }
  
  export const getChatHistory = async (sender: string, reciever: string) => {
    const history = await prisma.dms.findMany({
      where: {
        AND: [{ senderId: sender }, { reciever }],
      },
      orderBy: { createdAt: 'asc' },
    })
    const chatSession: {
      role: 'assistant' | 'user'
      content: string
    }[] = history.map((chat) => {
      return {
        role: chat.reciever ? 'assistant' : 'user',
        content: chat.message!,
      }
    })
  
    return {
      history: chatSession,
      automationId: history[history.length - 1].automationId,
    }
  }