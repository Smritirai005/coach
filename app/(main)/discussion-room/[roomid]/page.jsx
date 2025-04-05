"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ExpertList } from '@/services/Options'
import Image from 'next/image'
import { CoachingExpert } from '@/services/Options'
import { UserButton } from '@stackframe/stack'
import { Button } from '@/components/ui/button'
import RecordRTC from 'recordrtc'
import { useRef } from 'react'
import { RealtimeTranscriber } from 'assemblyai'
import { getToken } from '@/services/GlobalServices'




function DiscussionRoom() {
    const {roomid} = useParams();
    const [expert, setExpert] = useState();
    const [enableMic, setEnableMic] = useState(false);
    const recorder = useRef(null);
    const realtimeTranscriber = useRef(null);
    let silenceTimeout;
    const DiscussionRoomData=useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
    console.log(DiscussionRoomData);
    useEffect(() => {
      if(DiscussionRoomData){
        const Expert=CoachingExpert.find((item) => item.name === DiscussionRoomData?.expertName)
        setExpert(Expert);
      }
    },[DiscussionRoomData])

    const connectToServer= async ()=>{
      setEnableMic(true);

      realtimeTranscriber.current=new RealtimeTranscriber({
        token:await getToken(),
        sample_rate:16000

      })
      realtimeTranscriber.current.on('transcript', (transcript) => {
        console.log(transcript)

      })
      await realtimeTranscriber.current.connect();


      if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            recorder.current = new RecordRTC(stream, {
              type: 'audio',
              mimeType: 'audio/webm;codecs=pcm',
              recorderType: RecordRTC.StereoAudioRecorder,
              timeSlice: 250,
              desiredSampRate: 16000,
              numberOfAudioChannels: 1,
              bufferSize: 4096,
              audioBitsPerSecond: 128000,
              ondataavailable: async (blob) => {
                if (!realtimeTranscriber.current) return;
                // Reset the silence detection timer on audio input
                clearTimeout(silenceTimeout);
      
                const buffer = await blob.arrayBuffer();
      
                console.log(buffer)
                realtimeTranscriber.current.sendAudio(buffer);
      
                // Restart the silence detection timer
                silenceTimeout = setTimeout(() => {
                  console.log('User stopped talking');
                  // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                }, 2000);
              },
            });
            recorder.current.startRecording();
          })
          .catch((err) => console.error(err));
      }
      
    }
    const disconnect=async(e)=>{
      e.preventDefault();
      await realtimeTranscriber.current.close();
      recorder.current.pauseRecording();
      recorder.current=null;
      setEnableMic(false);
    }

    

  return (
    <div className='-mt-12'>
      <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-3  gap-10'>
        <div className='lg:col-span-2 h-[60vh]'>
        <div className='lg:col-span-2 h-[60vh] bg-secondary border rounded-4xl flex flex-col justify-center items-center relative'>
          <Image
          src={expert?.avatar}
          alt='Avatar'
          width={100}
          height={100}
          className=" h-[80px] w-[80px] object-cover rounded-full animate-pulse"
        />
        <h2 className='text-gray-500'>{expert?.name}</h2>
        <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
          <UserButton></UserButton>
        </div>
        </div>
        <div className='mt-5 flex item-center justify-center'>
          {!enableMic ?<Button onClick={connectToServer}>Connect</Button>
          :
          <Button variant="destructive" onClick={disconnect}>Disconnect</Button>}
        </div>
        </div>

        <div>
          <div className=' h-[60vh] bg-secondary border rounded-4xl flex flex-col justify-center items-center relative'>
          <h2>Chat Section</h2>


           </div>
           <h2 className='mt-4 text-gray-400 text-sm'>At the end of your conversation e will automatically generate feedback/notes</h2>

        </div>


      </div>
    </div>

  )
}

export default DiscussionRoom