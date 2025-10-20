// app/dashboard/error.tsx
"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Error() {

  return (
    <main className="w-full max-w-[1200px] mx-auto h-full min-h-screen md:px-8 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-5 items-center h-full md:grid-cols-2">

        <div className="grid grid-cols-1 gap-3">
          <h6 className="text-indigo-600 font-semibold text-2xl dark:text-indigo-500">500 Internal Error</h6>
          <h4 className="text-black/80 font-bold text-3xl dark:text-white">Whoops! That page doesn{"'"}t exists.</h4>
          <p className="text-muted-foreground">Here are some helpful links:</p>
          <div className="flex flex-row items-center justify-center gap-4 mt-5 md:justify-start">
            <Button
              className="flex flex-row items-center gap-1 font-medium text-sm bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white"
              onClick={() => window.location.reload()}
            >
              Go back home
            </Button>
            <Button
              variant={'ghost'}
              className="flex flex-row items-center gap-1 font-semibold text-black/80 text-sm dark:text-white"
            >
              Contact Support
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            width={1000}
            height={100}
            alt="Image"
            src={'/images/500.svg'}
            className="w-full h-full max-h-[700px]"
          />
        </div>

      </div>
    </main>
  );
}
