"use client";


import React, { Suspense } from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from './AuthProvider';

function Provider ({children}){
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <ConvexProvider client={convex}>
      <AuthProvider>{children}
      </AuthProvider>
    </ConvexProvider>
    </Suspense>
      
    
  )
}

export default Provider

