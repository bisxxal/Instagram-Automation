'use server'
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser } from "./queries"
import { refreshToken } from "@/lib/tokenFetch"
import { updateIntegration } from "../integrations/queries" 
import prisma from "@/lib/prisma"
import Stripe from "stripe"
 
export const onCurrentUser = async () => {
  try {
      const user = await currentUser()
      if (!user) return redirect('/sign-in')
    
      return user
  } catch (error) {
    
  }
  }
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
export const onBoardUser =async()=>{
    const user = await onCurrentUser()
    try {  
            const found  = await findUser(user?.id!)
            if(found){
                if(found.integrations.length>0){
                    const today = new Date()
                    const time_left = (found.integrations[0].expiresAt?.getTime() ?? 0) - today.getTime()
                    const days = Math.round(time_left/(1000 * 3600 * 24))
                    
                    if(days < 5){
                        console.log('refeshed');
                        const refesh = await refreshToken(found.integrations[0].token)
                        
                        const today = new Date()
                        const expire_date =  today.setDate(today.getDate()+60)

                        const updateToken = await updateIntegration(refesh.access_Token , new Date(expire_date) , found.integrations[0].id)
                        if(!updateToken){
                            console.log('updated token failed');
                            
                        }
                    }
                }
                return{
                    status:200,
                    data:{firstname:found.firstname , lastname:found.lastname}
                }
            } 
        if (user) {
            const created = await createUser(user.id, user.firstName!, user.lastName!, user.emailAddresses[0].emailAddress)
            return {status:201 , data:created}
        }
    } catch (error) {
        console.log("error in onborduser server actions ",error);
        
    }
}
export const onUserInfo = async()=>{
    const user = await onCurrentUser()
    try {
        const profile = await findUser(user?.id!)
        if(profile) return {status:200 , data:profile}

        return{status:404}
    } catch (error) {
        return{status:500}
    }
}

export const onSubscribe = async(session_id:string)=>{
    const user = await onCurrentUser()
    try {
        const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)
        const session  = await stripe.checkout.sessions.retrieve(session_id)
        if(session){
         
            const subscribed = await prisma.user.update({
                where: {
                  clerkId:user?.id,
                },
                data: {
                  subscription: {
                    create: {
                      // data: {
                        customerId: session.customer as string,
                        plan: 'PRO',
                      // },
                    },
                  },
                },
              })
    
            if (subscribed) return { status: 200 }
            return { status: 401 }
          }
          return { status: 404 }
        } catch (error) {
          console.log("error in onSubscribe server actions ",error);
          
          return { status: 500 }
        }
      }