'use client'

import Link from 'next/link'
import { SidebarMenuButton } from '../ui/sidebar'
import Image from 'next/image'
import Logo from '@/public/images/ico.png'
import LogoDark from '@/public/images/icon-dark.png'

export function LogoSwitcher({ continente }: { continente?: string }) {
  return (
    <SidebarMenuButton
      size={'lg'}
      className='flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-fit'
    >
      <Link
        href={continente ? '/' + continente + '/dashboard' : '/dashboard'}
        className='flex items-center justify-center'
      >
        <Image
          src={Logo}
          alt='Logo'
          width={100}
          height={20}
          className='block dark:hidden w-full h-full'
        />
        <Image
          src={LogoDark}
          alt='Logo'
          width={100}
          height={20}
          className='dark:block hidden w-full h-full'
        />
      </Link>
    </SidebarMenuButton>
  )
}
