import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { onUserInfo } from '@/actions/user'
import { getAllAutomations, getAutomationInfo } from "@/actions/automations";
import { PiExport } from "react-icons/pi";
const prefetch = async(client: QueryClient, action: QueryFunction, key: string )=>{
    return await client.prefetchQuery({
        queryKey: [key],
        queryFn: action,
        staleTime: 60000,
      })
}

export const PrefetchUserProfile = async (client: QueryClient) => {
    return await prefetch(client, onUserInfo, 'user-profile')
}

export const PrefetchUserAutnomations = async(client:QueryClient)=>{
     return await prefetch(client , getAllAutomations ,'user-automations')
}

export const PrefetchUserAutomation = async (
    client: QueryClient,
    automationId: string
  ) => {
    return await prefetch(
      client,
      () => getAutomationInfo(automationId),
      'automation-info'
    )
  }