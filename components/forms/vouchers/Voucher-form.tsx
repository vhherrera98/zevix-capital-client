"use client";

import { AcceptedFileTypes, FileUploader } from "@/components/inputs/file-upload-control";
import { InputControl } from "@/components/inputs/input-control";
import { SelectControl } from "@/components/inputs/select-control";
import { PageLoader } from "@/components/loaders/page-loader";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useI18n } from "@/hooks/use-i18n";
import { useGetAllCurrenciesTypesQuery } from "@/lib/Redux/web/endpoints/banks/tipo_moneda.endpoints";
import { regexNumber } from "@/utils/transform.utils";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { CreateVoucherDto, VoucherSchema } from "./voucher-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskDecimal } from "@/utils/masks.utils";
import { toast } from "sonner";
import { errorMessage } from "@/utils/error-message.utils";
import { useUploadVoucherMutation } from "@/lib/Redux/web/endpoints/vouchers/upload";
import { useRouter } from "next/navigation";

export function VoucherForm() {

 const { t } = useI18n();
 const router = useRouter();
 const { data: currencyResponse, isLoading, isError } = useGetAllCurrenciesTypesQuery();
 const [uploadVoucher, { isLoading: submiting }] = useUploadVoucherMutation();

 const currencies = useMemo(() => {
  if (!currencyResponse) return [];
  return currencyResponse.data.map((currency) => ({
   label: currency.nombre,
   value: currency.id
  }))
 }, [currencyResponse])

 const form = useForm<CreateVoucherDto>({
  mode: "all",
  resolver: zodResolver(VoucherSchema),
  defaultValues: {
   numero_transaccion: "",
   moneda_id: 0,
   monto: "",
   documento: []
  }
 });
 const { handleSubmit, control } = form;

 const submit = async (data: CreateVoucherDto) => {
  try {

   await uploadVoucher(data)
    .unwrap()
    .then((response) => {
     toast(response.data || response.message);
     router.back();
    })

  } catch (error) {
   toast(errorMessage(error));
  }
 }

 if (isLoading) return <PageLoader />;
 if (isError) throw new Error('Error con el servidor');;

 return (
  <Form {...form}>
   <form
    onSubmit={handleSubmit(submit)}
    className="grid grid-cols-1 gap-5"
   >

    <FormField
     control={control}
     name="numero_transaccion"
     render={({ field, fieldState }) => (
      <InputControl
       value={String(field.value)}
       onChange={({ target: { value } }) => {
        const result = regexNumber(value);
        if (result !== undefined) {
         field.onChange(String(result));
        }
       }}
       label={t("voucher_form_transaction_label")}
       placeholder={t("voucher_form_transaction_placeholder")}
       fieldState={fieldState}
       disabled={submiting}
      />
     )}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
     <FormField
      control={control}
      name="moneda_id"
      render={({ field, fieldState }) => (
       <SelectControl
        value={String(field.value)}
        onChange={(value) => field.onChange(Number(value))}
        options={currencies}
        fieldState={fieldState}
        label={t("voucher_form_currency_label")}
        placeholder={t("voucher_form_currency_placeholder")}
        disabled={submiting}
       />
      )}
     />
     <FormField
      control={control}
      name="monto"
      render={({ field, fieldState }) => (
       <InputControl
        type="text"
        value={field.value}
        onChange={({ target: { value } }) => field.onChange(maskDecimal(value))}
        label={t("voucher_form_amount_label")}
        placeholder={t("voucher_form_amount_placeholder")}
        fieldState={fieldState}
        pattern="^[0-9]*[.,]?[0-9]*$"
        inputMode="decimal"
        disabled={submiting}
       />
      )}
     />
    </div>

    <FormField
     control={control}
     name="documento"
     render={({ field, fieldState }) => (
      <FileUploader
       title={t("input_files_label")}
       description={t("input_file_placeholder_accept", {
        types: "JPEG, JPG, PGN"
       })}
       buttonText={t("input_upload_files")}
       accept={[AcceptedFileTypes.JPEG, AcceptedFileTypes.PNG]}
       value={field.value}
       onChange={(event) => field.onChange(event)}
       fieldState={fieldState}
       disabled={submiting}
      />
     )}
    />

    <Button
     type="submit"
     disabled={submiting}
    >
     {t("voucher_form_upload_button")}
    </Button>

   </form>
  </Form>
 )
}