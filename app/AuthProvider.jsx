"use client";


import React from 'react'
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUser } from '@stackframe/stack';
import { useEffect } from 'react';

function AuthProvider({children}) {

    const user=useUser();
    const CreateUser=useMutation(api.users.CreateUser);

    useEffect(()=>{
    console.log(user);
    user && CreateNewUser();
    },[user])

    const CreateNewUser=async()=>{
        const result=await CreateUser({
            name:user?.displayName,
            email:user?.primaryEmail
        });
        console.log(result);
    }

  return (
    <div>
        {children}
      
    </div>
  )
}

export default AuthProvider
