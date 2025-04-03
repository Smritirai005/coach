import React from 'react'
import { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { CoachingExpert } from '@/services/Options'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
  

function UserInputBox({children,ExpertList}) {
  const [selectedExpert, setSelectedExpert] = useState();
  const [topic, setTopic] = useState();
  return (
    <div>
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{ExpertList.name}</DialogTitle>
      <DialogDescription asChild>
       <div className='mt-3'>
            <h2 className='text-black'>Enter a topic to naster your skills in {ExpertList.name}</h2>
            <Textarea className="mt-2" placeholder="Enter your topic here ...."
            onChange={(e) => setTopic(e.target.value)}/>

            <h2 className='text-black mt-5'>Enter a topic to naster your skills in {ExpertList.name}</h2>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-6 mt-3'>
              {CoachingExpert.map((expert, index) => (
                <div key={index} onClick={()=> setSelectedExpert(expert.name)}>
                  <Image src={expert.avatar} alt={expert.name} 
                  width={100}
                  height={100}
                  className={`rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer p-1 border-primary border-2 ${selectedExpert==expert.name&&`border`}`}
                  />
                  <h2 className='text-black text-center'>{expert.name}</h2>
                </div>
              ))}

            </div>
            <div className='flex gap-5 justify-end mt-5'>
              <DialogClose asChild>
              <Button variant={'ghost'}>Cancel</Button>
              </DialogClose>
              <Button disabled={(!topic || !selectedExpert)}>Next</Button>

            </div>

       </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      
    </div>
  )
}

export default UserInputBox
