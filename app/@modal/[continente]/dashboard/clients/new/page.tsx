import { UserRoleForm } from "@/components/forms/users/user-role-form";
import { ModalDialog } from "@/components/modal";
import { getTranslations } from "@/i18n/translate";
import { getLangFromCookie } from "@/utils/getLang.server";

export default async function PageNewPartnerModal() {

 const lang = await getLangFromCookie();
 const { t } = await getTranslations(lang, ['clients']);

 return (
  <ModalDialog
   title={t("client_form_title")}
   description={t("client_form_subtitle")}
   className="lg:max-w-[700px]"
   back
  >
   <UserRoleForm role="Cliente" />
  </ModalDialog>
 )

}