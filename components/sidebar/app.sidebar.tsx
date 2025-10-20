'use client'

import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator
} from '../ui/sidebar'
import LanguageSwitcher from './language.switcher'
import { DarkmodeSwitcher } from './darkmode-switcher'
import { LogoSwitcher } from './logo-switcher'
import { UserSwitcher } from './user-switcher'
import { NavMain } from './nav-main'
import { Logout } from '../buttons/logout-button'
import { HomeButton } from './home-button'
// import { useAutoRefreshOnInactivity } from '@/hooks/use-auto-refresh-on-inactivity';

// const SIDEBAR_KEYBOARD_SHORTCUT = "b"
type Props = {
  continente?: string
} & React.ComponentProps<typeof Sidebar>

export function AppSidebar ({ continente, ...props }: Props) {
  // useAutoRefreshOnInactivity();

  return (
    <Sidebar
      className='border-r-0 overflow-hidden'
      collapsible='icon'
      variant='floating'
      {...props}
    >
      <SidebarHeader className='overflow-hidden rounded-tl-md rounded-tr-md'>
        <LogoSwitcher continente={continente} />
        <UserSwitcher continente={continente} />
      </SidebarHeader>

      <SidebarSeparator className='-translate-x-2' />

      <SidebarContent className='bg-gray-200 dark:bg-background'>
        <NavMain continente={continente} />
      </SidebarContent>

      <SidebarSeparator className='-translate-x-2' />

      <SidebarFooter className=''>
        <LanguageSwitcher />
        <DarkmodeSwitcher />
        {continente && <HomeButton />}
        <SidebarSeparator className='-translate-x-2' />
        <Logout />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
