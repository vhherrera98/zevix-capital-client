import { ScrollToTopButton } from '@/components/buttons/scroll-to-top.button'
import { Notifications } from '@/components/dropdowns/notifications.dropdown'
import { AppSidebar } from '@/components/sidebar/app.sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
// import { Toaster } from '@/components/ui/sonner'
import { ModalProvider } from '@/hooks/use-modal'
import { cookies } from 'next/headers'
import React from 'react'

export default async function layout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider
      className='bg-accent'
      style={
        {
          '--sidebar-width': '300px'
        } as React.CSSProperties
      }
      defaultOpen={defaultOpen}
    >
      <AppSidebar />

      <SidebarInset className='bg-white dark:bg-background border border-muted-foreground/10 rounded-2xl tablet:rounded-lg my-0 mr-0 tablet:my-2.5 tablet:mr-2'>
        <header className='sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 bg-white dark:bg-background rounded-tr-none rounded-tl-none tablet:rounded-tr-lg tablet:rounded-tl-lg z-10'>
          <div className='w-full flex items-center justify-between gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Notifications />
          </div>
        </header>
        <ModalProvider>
          {/* <GetMeGuard> */}
            <main className='flex flex-1 flex-col gap-4 px-4 py-8'>
              {children}
            </main>
          {/* </GetMeGuard> */}
        </ModalProvider>

        <ScrollToTopButton />

        {/* <Toaster richColors position='top-left' /> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
