"use client";

import { useForm } from "react-hook-form";
import { usuarioSchema, usuarioSchemaType } from "./user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { InputControl } from "@/components/inputs/input-control";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/loaders/page-loader";
import { capitalizeWords } from "@/utils/transform.utils";
import { useCreatePartnerMutation } from "@/lib/Redux/web/endpoints/users/partner/partner.endpoint";
import { useErrorToast, useSuccessToast } from "@/hooks/use-toast";
import { useCreateClientMutation } from "@/lib/Redux/web/endpoints/users/client/client.endpoint";

type Props = {
 role: "Socio" | "Cliente";
}

export function UserRoleForm({
 role
}: Props) {

 const { t } = useI18n();
 const [mounted, setMounted] = useState<boolean>(false);

 const [createPartner, { data: partnerSuccess, error: partnerError, isLoading: partnerLoading }] = useCreatePartnerMutation();
 const [createClient, { data: clientSuccess, error: clientError, isLoading: clientLoading }] = useCreateClientMutation();

 const isLoading = partnerLoading || clientLoading;

 const form = useForm<usuarioSchemaType>({
  mode: "all",
  resolver: zodResolver(usuarioSchema),
  defaultValues: {
   nombres: "",
   apellido_paterno: "",
   apellido_materno: "",
   email: ""
  }
 });
 const { control, handleSubmit } = form;

 const submit = async (data: usuarioSchemaType) => {
  if (role === 'Socio') {
   await createPartner(data).unwrap();
  } else {
   await createClient(data).unwrap();
  }
 }

 useErrorToast(partnerError || clientError);
 useSuccessToast(partnerSuccess || clientSuccess, true);
 useEffect(() => setMounted(true), []);
 if (!mounted) return <PageLoader />;

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
       onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
       label={t("partner_form_names")}
       placeholder={t("partner_form_placeholder")}
       fieldState={fieldState}
       tabIndex={1}
       autoComplete="none"
       disabled={isLoading}
      />
     )}
    />

    <FormField
     control={control}
     name="apellido_paterno"
     render={({ field, fieldState }) => (
      <InputControl
       value={field.value}
       onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
       label={t("partner_form_paternal_surname")}
       placeholder={t("partner_form_placeholder")}
       fieldState={fieldState}
       tabIndex={2}
       autoComplete="none"
       disabled={isLoading}
      />
     )}
    />

    <FormField
     control={control}
     name="apellido_materno"
     render={({ field, fieldState }) => (
      <InputControl
       value={field.value}
       onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
       label={t("partner_form_maternal_surname")}
       placeholder={t("partner_form_placeholder")}
       fieldState={fieldState}
       tabIndex={3}
       autoComplete="none"
       disabled={isLoading}
      />
     )}
    />

    <FormField
     control={control}
     name="email"
     render={({ field, fieldState }) => (
      <InputControl
       {...field}
       type="email"
       label={t("partner_form_mail")}
       placeholder={t("partner_form_placeholder")}
       fieldState={fieldState}
       tabIndex={4}
       autoComplete="none"
       disabled={isLoading}
      />
     )}
    />

    <Button
     type="submit"
     disabled={isLoading}
    >
     {t("partner_form_register")}
    </Button>

   </form>
  </Form>
 )
}