import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'
export const useMutatioinData = (mutationKey:MutationKey , mutationFn:MutationFunction<any , any> , queryKey?:string, onSuccess?:()=>void)=>{
    const  client = useQueryClient()
    const {mutate , isPending} = useMutation({
        mutationKey,
        mutationFn,
        onSuccess:(data: any)=>{
            if(onSuccess) onSuccess()
                return toast(data?.status === 200 ?"Success":"Error"  )
        },
        onSettled:async()=>{
            return await client.invalidateQueries({queryKey:[queryKey]})
        }
    })
    return {mutate , isPending}
}

export const useMutationDataState = (mutationKey:MutationKey)=>{
    const data = useMutationState({
        filters:{mutationKey},
        select:(mutation)=>{
           return{
            variables:mutation.state as any,
            status:mutation.state.status
           }
        }
    })
    const latestVariable = data[data.length - 1]
    return { latestVariable }
}