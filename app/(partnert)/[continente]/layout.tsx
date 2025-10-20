import { ScrollToTopButton } from '@/components/buttons/scroll-to-top.button'
import { AppSidebar } from '@/components/sidebar/app.sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
// import { Toaster } from '@/components/ui/sonner'
import StoreProvider from '@/context/store.provider'
import { ModalProvider } from '@/hooks/use-modal'
import { cookies } from 'next/headers'
import React from 'react'
import { LayoutContinente } from './_header'

export default async function layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { continente: string }
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

        <SidebarInset className='bg-white dark:bg-background border border-muted-foreground/10 rounded-2xl tablet:rounded-lg my-0 mr-0 tablet:my-2.5 tablet:mr-2'>
          <LayoutContinente continente={continente} />
          <ModalProvider>
            <div className='flex flex-1 flex-col gap-4 px-4 py-8'>
              {children}
            </div>
          </ModalProvider>

          <ScrollToTopButton />

          {/* <Toaster /> */}
        </SidebarInset>
      </SidebarProvider>
    </StoreProvider>
  )
}
