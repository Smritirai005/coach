"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ExpertList } from '@/services/Options'
import Image from 'next/image'
import { CoachingExpert } from '@/services/Options'

function DiscussionRoom() {
    const {roomid} = useParams();
    const [expert, setExpert] = useState();
    const DiscussionRoomData=useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
    console.log(DiscussionRoomData);
    useEffect(() => {
      if(DiscussionRoomData){
        const Expert=ExpertList.find((item) => item.name === DiscussionRoomData.expertName)
        setExpert(Expert);
      }
    },[DiscussionRoomData])

  return (
    <div>
      <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
      <div className='mt-5 grid grid-cols-1  lg:grid-cols-4 gap-10'>
        <div className='lg:col-span-3 h-[60vh] bg-secondary border rounded-4xl flex flex-col justify-center items-center animate-pulse'>
          <Image
          src={expert?.avatar}
          alt='Avatar'
          width={100}
          height={100}
          className=" h-[80px] w-[80px] object-cover rounded-full"
        />
        <h2 className='text-gray-500'>{expert?.name}</h2>
      
      
        </div>
        <div>


        </div>


      </div>
    </div>
  )
}

export default DiscussionRoom