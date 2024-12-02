import React from 'react'
import { Button } from '../ui/button'

const PaymentButton = () => {
  return (
    <Button className="bg-gradient-to-br
    text-white 
    rounded-full 
   from-[#6d60a3] 
   via-[#9434E6] 
   font-bold 
   to-[#CC3BD4]"
   >
     {/* {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />} */}
     Upgrade
    </Button>
  )
}

export default PaymentButton
