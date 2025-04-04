"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ExpertList } from '@/services/Options'
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
      <h2>Discussion room</h2>
    </div>
  )
}

export default DiscussionRoom