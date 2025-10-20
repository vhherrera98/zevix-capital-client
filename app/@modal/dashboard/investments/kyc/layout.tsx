"use client";
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function LayoutKYC({
  children
}: {
  children: React.ReactNode;
}) {

  // const params = useParams();
  // const continente = params.continente as string;
  // const redirect = "/" + continente + "/dashboard/investments";

  const router = useRouter();

  return (
    <Dialog
      open={true}
    >
      <DialogPortal>
        <DialogContent className="without-dialog-close w-full sm:max-w-full max-h-[calc(100vh)] overflow-y-auto rounded-none">
          <Button
            type="button"
            variant={'outline'}
            size={'icon'}
            className='absolute top-2 right-2 z-[9999999]'
            onClick={() => router.back()}
          >
            <X />
          </Button>
          <DialogHeader className='hidden'>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className='md:w-[700px] mx-auto lg:w-[900px]'>
            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
