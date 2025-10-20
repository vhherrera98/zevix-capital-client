"use client";
import { DNIForm } from "@/components/forms/documents/DNI-form";
import { PageLoader } from "@/components/loaders/page-loader";
import { ModalDialog } from "@/components/modal";
import { useI18n } from "@/hooks/use-i18n";
import { useFindOneBeneficiaryQuery } from "@/lib/Redux/web/endpoints/beneficiaries";
import { useSearchParams } from "next/navigation";

export default function PageUploadModal() {

 const { t } = useI18n();
 const searchParams = useSearchParams();
 const beneficiary = searchParams.get("beneficiary"); // 👈 obtenemos el parámetro

 return (
  <ModalDialog
   back
   title={`${t("form_document_up")} (${t("form_document_dni")})`}
   description={t("form_document_subtitle")}
   className="sm:max-w-[640px] md:max-w-[768px] lg:max-w-[868px]"
  >
   {
    beneficiary
     ?
     <ModalBeneficiary id={+beneficiary} />
     :
     <DNIForm />
   }
  </ModalDialog>
 )
}

function ModalBeneficiary({ id }: { id: number }) {

 const { data, isLoading, isError } = useFindOneBeneficiaryQuery(id);

 if (isLoading) return <PageLoader />;
 if (isError || !data) return <h1>No existe</h1>;

 const { data: beneficiary } = data;

 return (
  <div className="flex flex-col gap-3">
   <h4 className="text-lg font-bold text-black/80 dark:text-white">
    {beneficiary.nombres}{" "}{beneficiary.apellidos}
   </h4>
   <DNIForm beneficiaryId={beneficiary.id} />
  </div>
 )
}