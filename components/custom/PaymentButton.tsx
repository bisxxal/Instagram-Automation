'use client'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

const PaymentButton = () => {
  const { onSubscribe, isProcessing } = useSubscription()
  return (
    <Button className="bg-gradient-to-br
    text-white 
    rounded-full 
   from-[#6d60a3] 
   via-[#9434E6] 
   font-bold 
   to-[#CC3BD4]"
   disabled={isProcessing}
   onClick={onSubscribe}
   >
     {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
     Upgrade
    </Button>
  )
}

export default PaymentButton
