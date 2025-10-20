"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function NotFoundPage() {

  const router = useRouter();

  return (
    <div className='w-full h-full min-h-screen py-20 bg-white flex items-center justify-center'>
      <div className='px-5 md:px-10 lg:px-0 w-[900px] mx-auto my-auto h-full flex flex-col items-center justify-center gap-0'>

        <Image
          width={500}
          height={500}
          alt='not found'
          src={'/images/forest.svg'}
          className='w-full'
        />
        <h1 className='text-black/80 text-2xl font-semibold my-5'>
          Oops! Page Not Found
        </h1>
        <p className='text-muted-foreground text-center'>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Button
          type='button'
          className=' mt-5'
          onClick={() => router.push("/")}
        >
          Go Back Home
        </Button>

      </div>
    </div>
  )
}
