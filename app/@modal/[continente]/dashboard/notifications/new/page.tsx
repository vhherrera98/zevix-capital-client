import { NotificationForm } from '@/app/(partnert)/[continente]/dashboard/notifications/_components/_forms/notification-form';
import { auth } from '@/auth';
import { ModalDialog } from '@/components/modal'
import { getTranslations } from '@/i18n/translate';
import { Persona } from '@/types/person.type';
import { getLangFromCookie } from '@/utils/getLang.server';
import React from 'react'

const getPersons = async (): Promise<Persona[] | null> => {

 const session = await auth();

 const response = await fetch(process.env.NEXT_PUBLIC_SERVER_PATHNAME + "/persons/except", {
  headers: {
   "x-user-id": `${session?.user.id}`
  }
 });
 if (!response.ok) return null;
 const data = await response.json();
 const { data: result } = data;
 return result;
}


export default async function page() {

 const lang = await getLangFromCookie();
 const { t } = await getTranslations(lang, ['notifications_new_page']);

 const [persons] = await Promise.all([getPersons()]);
 if (!persons) return "ni modos";

 return (
  <ModalDialog
   title={t("npn_title")}
   md="1000px"
   back
  >
   <NotificationForm persons={persons} />
  </ModalDialog>
 )
}
