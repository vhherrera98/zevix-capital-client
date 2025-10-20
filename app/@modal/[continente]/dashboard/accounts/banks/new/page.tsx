import BankAccountForm from '@/components/forms/banks/BankAccountForm';
import { ModalDialog } from '@/components/modal'
import { getTranslations } from '@/i18n/translate';
import { getLangFromCookie } from '@/utils/getLang.server';
import React from 'react'

export default async function PageNewAccountBank() {

 const lang = await getLangFromCookie();
 const { t } = await getTranslations(lang, ['banks']);

 return (
  <ModalDialog
   back
   title={t("form_bank_title")}
   description={t("form_bank_subtitle")}
  >
   <BankAccountForm />
  </ModalDialog>
 )
}
