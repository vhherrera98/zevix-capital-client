"use client"

import { useI18n } from "@/hooks/use-i18n"
import { useForm } from "react-hook-form";
import { CuentaBancoSchema } from "./cuenta-banco.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { InputControl } from "@/components/inputs/input-control";
import { Button } from "@/components/ui/button";
import { capitalizeWords, regexNumber } from "@/utils/transform.utils";
import { useEffect, useMemo, useState } from "react";
import { PageLoader } from "@/components/loaders/page-loader";
import { useGetAllAccountTypesQuery } from "@/lib/Redux/web/endpoints/banks/tipo_cuenta.endpoint";
import { useGetAllCurrenciesTypesQuery } from "@/lib/Redux/web/endpoints/banks/tipo_moneda.endpoints";
import { SelectControl } from "@/components/inputs/select-control";
import { useCreateCuentaBancoMutation } from "@/lib/Redux/web/endpoints/banks";
import { useErrorToast, useSuccessToast } from "@/hooks/use-toast";

export default function BankAccountForm() {

  const [mounted, setMounted] = useState<boolean>(false);

  const { data: accounts, isLoading: isAccountLoading } = useGetAllAccountTypesQuery();
  const { data: currencies, isLoading: isCurrenciesLoading } = useGetAllCurrenciesTypesQuery();

  const [saveAccount, { isLoading: submiting, error, data: success }] = useCreateCuentaBancoMutation();

  const { t } = useI18n();
  const form = useForm<z.infer<typeof CuentaBancoSchema>>({
    mode: "all",
    resolver: zodResolver(CuentaBancoSchema),
    defaultValues: {
      banco_nombre: "",
      numero_cuenta: 0,
      titular: "",
      tipo_cuenta_id: 0,
      moneda_id: 0
    } as z.infer<typeof CuentaBancoSchema>
  });
  const { control, handleSubmit } = form;

  const accountsOptions = useMemo(() => {
    if (!accounts) return [];
    return accounts.data.map((account) => ({
      label: account.nombre,
      value: account.id
    }))
  }, [accounts]);

  const currenciesOptions = useMemo(() => {
    if (!currencies) return [];
    return currencies.data.map((currency) => ({
      label: currency.nombre,
      value: currency.id
    }))
  }, [currencies]);

  const submit = async (data: z.infer<typeof CuentaBancoSchema>) => {
    await saveAccount(data).unwrap()
      .then((response) => {
        console.log(response)
      })
  }

  useErrorToast(error);
  useSuccessToast(success, true);

  useEffect(() => setMounted(true), []);
  const isLoading = !mounted || isAccountLoading || isCurrenciesLoading;
  if (isLoading) return <PageLoader />;
  if (!accounts || !currencies) return "ni modo";

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-1 gap-5"
      >

        <FormField
          control={control}
          name="banco_nombre"
          render={({ field, fieldState }) => (
            <InputControl
              value={field.value}
              onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
              label={t("form_bank_name")}
              placeholder={t("form_bank_input_placeholder")}
              fieldState={fieldState}
              disabled={submiting}
            />
          )}
        />

        <FormField
          control={control}
          name="numero_cuenta"
          render={({ field, fieldState }) => (
            <InputControl
              value={field.value}
              onChange={(event) => field.onChange(regexNumber(event.target.value))}
              label={t("form_bank_account_number")}
              placeholder={t("form_bank_input_placeholder")}
              fieldState={fieldState}
              disabled={submiting}
            />
          )}
        />

        <FormField
          control={control}
          name="titular"
          render={({ field, fieldState }) => (
            <InputControl
              value={field.value}
              onChange={(event) => field.onChange(capitalizeWords(event.target.value))}
              label={t("form_bank_account_holder_name")}
              placeholder={t("form_bank_input_placeholder")}
              fieldState={fieldState}
              disabled={submiting}
            />
          )}
        />

        <FormField
          control={control}
          name="tipo_cuenta_id"
          render={({ field, fieldState }) => (
            <SelectControl
              label={t("form_bank_account_type")}
              placeholder={t("form_bank_options_placeholder")}
              options={accountsOptions}
              value={String(field.value)}
              onChange={(value) => field.onChange(Number(value))}
              fieldState={fieldState}
              disabled={submiting}
            />
          )}
        />

        <FormField
          control={control}
          name="moneda_id"
          render={({ field, fieldState }) => (
            <SelectControl
              label={t("form_bank_account_currency_type")}
              placeholder={t("form_bank_options_placeholder")}
              options={currenciesOptions}
              value={String(field.value)}
              onChange={(value) => field.onChange(Number(value))}
              fieldState={fieldState}
              disabled={submiting}
            />
          )}
        />

        <Button type="submit">{t("form_bank_submit")}</Button>
      </form>
    </Form>
  )
}
