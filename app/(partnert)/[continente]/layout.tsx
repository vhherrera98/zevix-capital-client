import { ScrollToTopButton } from '@/components/buttons/scroll-to-top.button'
import { AppSidebar } from '@/components/sidebar/app.sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
// import { Toaster } from '@/components/ui/sonner'
import StoreProvider from '@/context/store.provider'
import { ModalProvider } from '@/hooks/use-modal'
import { cookies } from 'next/headers'
import React from 'react'
import { LayoutContinente } from './_header'
import { Notifications } from '@/components/dropdowns/notifications.dropdown'

export default async function layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ continente: string }>
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  const { continente } = await params

  return (
    <StoreProvider>
      <SidebarProvider
        className='bg-accent'
        style={
          {
            '--sidebar-width': '300px'
          } as React.CSSProperties
        }
        defaultOpen={defaultOpen}
      >
        <AppSidebar continente={continente} />

        <SidebarInset className='bg-transparent'>
          <LayoutContinente continente={continente} />
          {/* <LogoSwitcher continente={continente} /> */}
          <div
            className='h-full bg-white dark:bg-background border border-muted-foreground/10 rounded-2xl tablet:rounded-lg my-0 mr-0 tablet:my-2.5 tablet:mr-2'
          >
            <header className='sticky top-0 flex shrink-0 items-center justify-between gap-2 border-b p-4 bg-white dark:bg-background rounded-tr-none rounded-tl-none tablet:rounded-tr-lg tablet:rounded-tl-lg z-10'>
              <SidebarTrigger className='-ml-1' />
              <Notifications />
            </header>
            <ModalProvider>
              <div className='flex flex-col gap-4 px-4 py-8'>
                {children}
              </div>
            </ModalProvider>
          </div>
          <ScrollToTopButton />

          {/* <Toaster /> */}
        </SidebarInset>
      </SidebarProvider>
    </StoreProvider>
  )
}
