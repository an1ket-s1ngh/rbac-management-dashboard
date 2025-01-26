import React from 'react'
import SignOut from '../dashboard/components/SignOut'

export default function page() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
    <div className="w-90 h-40 rounded-md border p-5 space-y-5">
        <div className='flex items-center justify-center gap-2'>
        <h1 className="text-2xl font-bold justify-stretch">Sorry, You ar no longer an active user 🥺</h1>
        </div>

        <div className='flex flex-col gap-5'>
        <SignOut />
        </div>
    </div>
    </div>
  )
}
