"use client";


import React from 'react'
import { useUser } from '@stackframe/stack'
import { Button } from '@/components/ui/button';
import { ExpertList } from '@/services/Options';
import Image from 'next/image';

function FeatureAssistant() {
    const user=useUser();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
        <h2 className='font-medium text-gray-500'>My Workspace</h2>
        <h2 className='text-3xl font-bold'>Welcome back,{user?.displayName}</h2>
        </div>
        <Button>Profile</Button>
      </div>
      <div>
        {ExpertList.map((item,index)=>(
          <div>
            <Image src={option.icon} alt={option.name} width={150} height={150} className='h-[70px] w-[70px]'/>
          </div>
        ))}
      </div>
        
    </div>
  )
}

export default FeatureAssistant
