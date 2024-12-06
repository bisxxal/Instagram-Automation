
import { createAutomations } from "@/actions/automations"
import { useMutatioinData } from "./use-mutation-data"
 
export const useCreateAutomation = (id?:string)=>{
    const {mutate , isPending} = useMutatioinData(['create-automation'] , ()=>createAutomations(id) ,'user-automations')

    return {mutate , isPending}
}