import React from 'react'
import PaymentCard from './PaymentCard'

const Billing = () => {
  const data = {
    data: {
      subscription: {
        plan: 'Basic'
      }
    }
  };
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard
        current={data?.data?.subscription?.plan!}
        label="PRO"
      />
      <PaymentCard
        current={data?.data?.subscription?.plan!}
        label="FREE"
      />
    </div>
  )
}

export default Billing
