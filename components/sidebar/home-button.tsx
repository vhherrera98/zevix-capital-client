'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Home } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'
import { cn } from '@/lib/utils'

export function HomeButton () {
  const router = useRouter()
  const { state } = useSidebar()

  return (
    <Button
      type='button'
      variant={'ghost'}
      className={cn(
        'flex text-start items-center justify-start gap-2',
        state === 'collapsed' && 'justify-center'
      )}
      size={state === 'collapsed' ? 'icon' : 'default'}
      onClick={() => router.push('/')}
    >
      <Home />
      {state !== 'collapsed' && <span>Home</span>}
    </Button>
  )
}
