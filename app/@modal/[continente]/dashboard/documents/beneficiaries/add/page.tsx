import { BeneficiaryForm } from "@/components/forms/documents/beneficiaries/Beneficiary-form";
import { ModalDialog } from "@/components/modal";
import { getTranslations } from "@/i18n/translate";
import { getLangFromCookie } from "@/utils/getLang.server";

export default async function AddBeneficiaryModal() {

 const lang = await getLangFromCookie();
 const { t } = await getTranslations(lang, ["doc_beneficiario"])

 return (
  <ModalDialog
   back
   title={t("doc_beneficiario_form_title")}
   description={t("doc_beneficiario_form_description")}
   className="md:max-w-[600px]"
  >
   <BeneficiaryForm />
  </ModalDialog>
 )

}