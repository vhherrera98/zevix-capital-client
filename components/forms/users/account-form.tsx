"use client";
import { InputControl } from "@/components/inputs/input-control";
import { SelectControl } from "@/components/inputs/select-control";
import { PageLoader } from "@/components/loaders/page-loader";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useI18n } from "@/hooks/use-i18n";
import { useGetAllCountriesQuery, useLazyGetCitiesByDepartmentQuery, useLazyGetDepartmentsByCountryQuery } from "@/lib/Redux/web/endpoints/locations";
import { useGetAllMaritalStatusQuery } from "@/lib/Redux/web/endpoints/users/estado-civil";
import { useGetAllGendersQuery } from "@/lib/Redux/web/endpoints/users/gender/gender.endpoint";
import { maskDate } from "@/utils/masks.utils";
import { capitalizeWords, formatDateToDDMMYYYY } from "@/utils/transform.utils";
import { useForm } from "react-hook-form";
import { UpdatePersona, updatePersonaSchema } from "./account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslatedOptions } from "@/hooks/use-options-translate";
import { useRouter } from "next/navigation";
import { useUpdatePersonMutation } from "@/lib/Redux/web/endpoints/users";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Persona } from "@/types/usuario.type";
import { useEffect } from "react";

export function AccountForm({
 persona
}: {
 persona: Persona | undefined
}) {

 const { t } = useI18n();
 const router = useRouter();
 const { data: session, update } = useSession();

 const { data: gendersData, isLoading: genderLoading, isError: genderError } = useGetAllGendersQuery();
 const { data: maritalStatusData, isLoading: maritalStatusLoading, isError: maritalStatusError } = useGetAllMaritalStatusQuery();
 const { data: countries, isLoading, isError } = useGetAllCountriesQuery();
 const [triggerDeparments, { data: departments }] = useLazyGetDepartmentsByCountryQuery();
 const [triggerCities, { data: cities }] = useLazyGetCitiesByDepartmentQuery();

 const genders = useTranslatedOptions(gendersData, t);
 const maritalStatus = useTranslatedOptions(maritalStatusData, t);

 const [updateSubmit, { isLoading: submiting }] = useUpdatePersonMutation();

 const form = useForm<UpdatePersona>({
  mode: "all",
  resolver: zodResolver(updatePersonaSchema),
  defaultValues: {
   nombres: "",
   apellidos: "",
   pais: 0,
   departamento: 0,
   ciudad: 0,
   genero: 0,
   estado_civil: 0,
   fecha_nacimiento: ""
  }
 });
 const { handleSubmit, control, reset, getValues } = form;

 const submit = async (data: UpdatePersona) => {
  try {
   if (!session) return;
   await updateSubmit(data)
    .unwrap()
    .then(async (response) => {
     toast(response.message);
     await update({
      ...session.user,
      name: String(response.data.nombres) + " " + String(response.data.apellidos)
     })
     router.back();
    })
  } catch (error) {
   console.log(error);
  }
 }

 useEffect(() => {
  if (!persona) return;

  if (persona.pais_nacionali_id) {
   triggerDeparments(String(persona.pais_nacionali_id))
  }

  if (persona.dpto_nacimi_id) {
   triggerCities(String(persona.dpto_nacimi_id))
  }

  setTimeout(() => {
   reset({
    nombres: persona.nombres,
    apellidos: persona.apellidos,
    fecha_nacimiento: formatDateToDDMMYYYY(persona?.fch_nacimi) || "",
    genero: persona?.genero_id || 0,
    estado_civil: persona?.estado_civil_id || 0,
    pais: persona?.pais_nacionali_id || 0,
    departamento: persona?.dpto_nacimi_id || 0,
    ciudad: persona?.ciud_nacimi_id || 0,
   });
  }, 500)

 }, [persona, reset, triggerDeparments, , triggerCities, getValues])


 if (isLoading || genderLoading || maritalStatusLoading) return <PageLoader />;
 if (isError || genderError || maritalStatusError) throw new Error('Error con el servidor');;

 return (
  <Form {...form}>
   <form
    onSubmit={handleSubmit(submit)}
    className="grid grid-cols-1 gap-5"
   >

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

     <FormField
      control={control}
      name="nombres"
      render={({ field, fieldState }) => (
       <InputControl
        value={field.value}
        onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
        label={t("account_firstname_label")}
        placeholder={t("account_firstname_placeholder")}
        fieldState={fieldState}
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
        onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
        label={t("account_lastname_label")}
        placeholder={t("account_lastname_placeholder")}
        fieldState={fieldState}
        disabled={submiting}
       />
      )}
     />

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

     <FormField
      control={control}
      name="fecha_nacimiento"
      render={({ field, fieldState }) => (
       <InputControl
        value={field.value}
        onChange={(event) => field.onChange(maskDate(event.target.value))}
        label={t("account_date_label")}
        placeholder={t("account_date_placeholder")}
        fieldState={fieldState}
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
        label={t("account_gender_label")}
        placeholder={t("account_gender_placeholder")}
        options={genders || []}
        fieldState={fieldState}
        disabled={submiting}
       />
      )}
     />

     <FormField
      control={control}
      name="estado_civil"
      render={({ field, fieldState }) => (
       <SelectControl
        value={String(field.value)}
        onChange={(value) => field.onChange(Number(value))}
        label={t("account_marital_state_label")}
        placeholder={t("account_marital_state_placeholder")}
        options={maritalStatus || []}
        fieldState={fieldState}
        disabled={submiting}
       />
      )}
     />

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

     <FormField
      control={control}
      name="pais"
      render={({ field, fieldState }) => (
       <SelectControl
        value={String(field.value)}
        onChange={(value) => {
         field.onChange(Number(value));
         triggerDeparments(value);
         reset({
          ...form.getValues(),
          pais: Number(value),
          departamento: 0,
          ciudad: 0
         });
        }}
        label={t("account_pais_label")}
        placeholder={t("account_pais_placeholder")}
        options={countries || []}
        fieldState={fieldState}
        disabled={submiting}
       />
      )}
     />

     <FormField
      control={control}
      name="departamento"
      render={({ field, fieldState }) => (
       <SelectControl
        value={String(field.value)}
        onChange={(value) => {
         field.onChange(Number(value));
         triggerCities(value);
         reset({
          ...form.getValues(),
          departamento: Number(value),
          ciudad: 0
         });
        }}
        label={t("account_departamento_label")}
        placeholder={t("account_departamento_placeholder")}
        options={departments || []}
        fieldState={fieldState}
        disabled={!departments || submiting}
       />
      )}
     />

     <FormField
      control={control}
      name="ciudad"
      render={({ field, fieldState }) => (
       <SelectControl
        value={String(field.value)}
        onChange={(value) => field.onChange(Number(value))}
        label={t("account_ciudad_label")}
        placeholder={t("account_ciudad_placeholder")}
        options={cities || []}
        fieldState={fieldState}
        disabled={(cities?.length === 0 || form.getValues("departamento") === 0) || submiting}
       />
      )}
     />

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 mt-3">
     <Button
      type="button"
      variant={'outline'}
      className="order-2 md:order-1"
      onClick={() => router.back()}
      disabled={submiting}
     >{t("account_cancel")}</Button>
     <Button
      type="submit"
      variant={'default'}
      className="order-1 md:order-2"
      disabled={submiting}
     >{t("account_submit")}</Button>
    </div>

   </form>
  </Form>
 )
}