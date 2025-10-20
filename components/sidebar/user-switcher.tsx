'use client'

import { useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'
import { useMemo } from 'react'
import { useSidebar } from '../ui/sidebar'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { BadgeCheck, ChevronsUpDown, CreditCard } from 'lucide-react'
import Link from 'next/link'

export function UserSwitcher ({ continente }: { continente?: string }) {
  const { status, data } = useSession()
  const { state, isMobile } = useSidebar()
  const user = data?.user

  const initials = useMemo(() => {
    if (!user?.name) return ''
    const names = user.name.split(' ')
    const firstInitial = names[0]?.[0] ?? ''
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0] : ''
    return (firstInitial + lastInitial).toUpperCase()
  }, [user?.name])

  if (status === 'loading' || !data || !data?.user)
    return <Skeleton className='w-full h-10' />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'w-full flex flex-row gap-2 items-center justify-start cursor-pointer hover:opacity-70',
            state === 'collapsed' ? 'justify-center' : 'justify-start'
          )}
        >
          <Avatar className='w-10 h-10 rounded-md'>
            <AvatarFallback className='w-full h-full rounded-md bg-indigo-500 flex items-center justify-center font-medium'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'flex flex-col gap-0 items-start justify-center',
              state === 'collapsed' ? 'hidden' : 'visible'
            )}
          >
            <h4 className='text-black/80 font-medium text-sm dark:text-white'>
              {user?.name}
            </h4>
            <h6 className='text-muted-foreground text-[12px] -mt-1'>
              {user?.email}
            </h6>
          </div>
          <ChevronsUpDown
            className={cn(
              'ml-auto size-4',
              state === 'collapsed' ? 'hidden' : 'visible'
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side={isMobile ? 'right' : 'right'}
        align='start'
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={
                continente
                  ? '/' + continente + '/dashboard/settings/account'
                  : '/dashboard/settings/account'
              }
              className='w-full flex items-center justify-start gap-2'
            >
              <BadgeCheck />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={
                continente
                  ? '/' + continente + '/dashboard/settings'
                  : '/dashboard/settings'
              }
              className='w-full flex items-center justify-start gap-2'
            >
              <CreditCard />
              Inversiones
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
