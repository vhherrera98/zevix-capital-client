/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import { ListNotifications } from '../_components/list-notifications.component'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useI18n } from '@/hooks/use-i18n'
import { useGetNotificationsPendingsQuery } from '@/lib/Redux/web/endpoints/notifications'
import { PageLoader } from '@/components/loaders/page-loader'
import { useParams } from 'next/navigation'

export default function PageNotificationRequest () {
  const params = useParams()
  const continente = params.continente as string

  const { data, isLoading, refetch } = useGetNotificationsPendingsQuery()
  const { t, lang } = useI18n()

  useEffect(() => {
    refetch()
  }, [lang])

  if (isLoading) return <PageLoader />
  if (!data) return 'chau...'

  const { data: notifications } = data

  return (
    <main className='grid grid-cols-1 gap-5'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-black/80 dark:text-white text-2xl font-bold'>
          {t('np_notifications')}
        </h1>
        <p className='text-muted-foreground font-medium'>{t('np_hint')}</p>
      </div>

      <ListNotifications notifications={notifications} />

      <Link
        href={'/' + continente + '/dashboard/notifications/new'}
        className='fixed bottom-5 right-5 bg-green-600/80 dark:bg-green-600 text-white flex items-center justify-center w-14 h-14 hover:w-52 text-sm rounded-full gap-2 group transition-all ease-in-out duration-300 overflow-hidden'
        scroll={false}
      >
        <Plus size={25} />
        <span className='group-hover:block group-hover:opacity-100 opacity-0 hidden transition-all duration-200 text-nowrap'>
          {t('btn_new_notification')}
        </span>
      </Link>
    </main>
  )
}
