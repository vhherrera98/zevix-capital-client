"use client";

import { InputControl } from "@/components/inputs/input-control";
import { SelectControl } from "@/components/inputs/select-control";
import { PageLoader } from "@/components/loaders/page-loader";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useI18n } from "@/hooks/use-i18n";
import { useTranslatedOptions } from "@/hooks/use-options-translate";
import { useGetAllGendersQuery } from "@/lib/Redux/web/endpoints/users/gender/gender.endpoint";
import { maskDate } from "@/utils/masks.utils";
import { capitalizeWords } from "@/utils/transform.utils";
import { useForm } from "react-hook-form";
import { BeneficiarioSchema, BeneficiarioType } from "./beneficiario-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBeneficiaryMutation } from "@/lib/Redux/web/endpoints/beneficiaries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export function BeneficiaryForm() {

 const { t } = useI18n();
 const router = useRouter();
 const { data: dataGenders, isLoading, isError } = useGetAllGendersQuery();
 const genders = useTranslatedOptions(dataGenders, t)

 const [addBeneficiary, { isLoading: submiting }] = useCreateBeneficiaryMutation();

 const form = useForm<BeneficiarioType>({
  mode: "all",
  resolver: zodResolver(BeneficiarioSchema),
  defaultValues: {
   nombres: "",
   apellidos: "",
   genero: 0,
   fecha_nacimiento: ""
  }
 });
 const { handleSubmit, control } = form;

 const submit = async (data: BeneficiarioType) => {
  try {
   await addBeneficiary(data).unwrap()
    .then((response) => {
     toast(response.data || response.message);
     router.back();
    })
  } catch (error) {
   console.log(error)
   const err = error as FetchBaseQueryError | SerializedError;

   const message =
    'data' in err && typeof err.data === 'object' && err.data !== null && 'message' in err.data
     ? (err.data as { message: string }).message
     : 'INTERNAL ERROR';

   toast(message);
  }
 }

 if (isLoading) return <PageLoader />;
 if (isError || !dataGenders) throw new Error('Error con el servidor');;

 return (
  <Form {...form}>
   <form
    onSubmit={handleSubmit(submit)}
    className="grid grid-cols-1 gap-5"
   >

    <FormField
     control={control}
     name="nombres"
     render={({ field, fieldState }) => (
      <InputControl
       value={field.value}
       onChange={(e) => field.onChange(capitalizeWords(e.target.value))}
       fieldState={fieldState}
       label={t("doc_beneficiario_form_firstname_label")}
       placeholder={t("doc_beneficiario_form_firstname_placeholder")}
       disabled={submiting}
      />
     )}
    />

    <FormField
     control={control}
     name="apellidos"
     render={({ field, fieldState }) => (
      <InputControl
       value={field.value}
       onChange={(e) => field.onChange(capitalizeWords(e.target.value))}
       fieldState={fieldState}
       label={t("doc_beneficiario_form_lastname_label")}
       placeholder={t("doc_beneficiario_form_lastname_placeholder")}
       disabled={submiting}
      />
     )}
    />

    <FormField
     control={control}
     name="genero"
     render={({ field, fieldState }) => (
      <SelectControl
       value={String(field.value)}
       onChange={(value) => field.onChange(Number(value))}
       options={genders}
       fieldState={fieldState}
       label={t("doc_beneficiario_form_gender_label")}
       placeholder={t("doc_beneficiario_form_gender_placeholder")}
       disabled={submiting}
      />
     )}
    />

    <FormField
     control={control}
     name="fecha_nacimiento"
     render={({ field, fieldState }) => (
      <InputControl
       value={field.value}
       onChange={(e) => field.onChange(maskDate(e.target.value))}
       fieldState={fieldState}
       label={t("doc_beneficiario_form_birthdate_label")}
       placeholder={t("doc_beneficiario_form_birthdate_placeholder")}
       disabled={submiting}
      />
     )}
    />

    <Button
     type="submit"
     disabled={submiting}
    >{t("doc_beneficiario_form_submit")}</Button>

   </form>
  </Form>
 )
}