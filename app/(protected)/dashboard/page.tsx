 

import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'  
 

const Page = async ( ) => {
  const user = await onBoardUser()
  console.log("user is",user);
  
  if (user?.status === 200 || user?.status === 201) {
    return redirect(`dashboard/${user?.data?.firstname}${user?.data?.lastname}`)
  }

  return redirect('/sign-in')
}

export default Page