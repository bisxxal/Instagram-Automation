'use server'
 
import { onCurrentUser } from "../user"
import { CreateAutomation, getAutomations } from "./quries"

export const createAutomations = async()=>{
    const user = await onCurrentUser()
    try {
        const craete = await CreateAutomation(user?.id!)

        if(craete) return {status:200 , data:'automation created!'}

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

         return{status:404 , data:'Oops something went wrong!'}
    } catch (error) {
        return{status:500 , data:'Internal server error!'}
    }
}

