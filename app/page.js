"use client";
// import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import React from 'react'
import Layout from '../components/Layout';

const page = () => {
  const {data:session}=useSession();
  return (
    <Layout>
      <div className='flex text-slate-600 justify-between'>
        <h2 className='font-semibold font-sans text-18'>Hello, <b className='text-xl '>{session?.user?.name}</b></h2>
        <div className='bg-slate-200 flex gap-1 text-black rounded-md overflow-hidden font-semibold'>
          <img src={session?.user?.image} alt="" className='w-8 h-8' />
          <span className='px-2 py-1'>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}

export default page