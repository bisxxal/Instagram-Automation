'use server'
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser, findUser } from "./queries"
import { refreshToken } from "@/lib/tokenFetch"
import { updateIntegration } from "../integrations/queries"
 
export const onCurrentUser = async () => {
  try {
      const user = await currentUser()
      if (!user) return redirect('/sign-in')
    
      return user
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