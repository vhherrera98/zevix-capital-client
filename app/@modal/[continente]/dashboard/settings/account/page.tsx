"use client";
import { AccountForm } from '@/components/forms/users/account-form'
import { ModalDialog } from '@/components/modal'
import { useI18n } from '@/hooks/use-i18n';
import { useGetPersonQuery } from '@/lib/Redux/web/endpoints/users';
import React from 'react'

export default function PageAccountPerson() {

  const { t } = useI18n();
  const { data: persona } = useGetPersonQuery();

  return (
    <ModalDialog
      back
      title={t("account_title")}
      description={t("account_placeholder")}
      className='md:max-w-[800px]'
    >
      <AccountForm persona={persona} />
    </ModalDialog>
  )
}
