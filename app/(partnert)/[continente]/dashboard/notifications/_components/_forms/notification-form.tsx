"use client";
import { useForm } from "react-hook-form";
import { LanguageForm } from "./language-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { MultiSelectSearch } from "@/components/inputs/multi-select.input";
import { useMemo } from "react";
import { notificationSchema } from "../../notification.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Persona } from "@/types/person.type";
import { useCreateNotificationMutation } from "@/lib/Redux/web/endpoints/notifications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export function NotificationForm({
  persons
}: {
  persons: Persona[]
}) {

  const { t } = useI18n();
  const router = useRouter();

  const [createNotification, { isLoading }] = useCreateNotificationMutation();

  const options = useMemo(() => {
    return persons.map((person) => ({
      value: person.id,
      label: String(person.nombres) + " " + String(person.apellidos)
    }))
  }, [persons]);

  const form = useForm<z.infer<typeof notificationSchema>>({
    mode: 'all',
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      titulo_en: "",
      titulo_es: "",
      descripcion_es: "",
      descripcion_en: "",
      personas: []
    }
  });
  const { control, handleSubmit, formState: { errors } } = form;
  console.log(errors)

  const submit = async (data: z.infer<typeof notificationSchema>) => {
    try {
      await createNotification(data)
        .unwrap()
        .then((res) => {
          toast(res.message, {
            description: res.data.message,
          });
          router.back();
          router.refresh();
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-1 gap-5"
      >
        <LanguageForm
          name={t("npn_english")}
          control={control}
          title="titulo_en"
          description="descripcion_en"
          disabled={isLoading}
        />

        <hr />

        <LanguageForm
          name={t("npn_spanish")}
          control={control}
          title="titulo_es"
          description="descripcion_es"
          disabled={isLoading}
        />

        <FormField
          control={control}
          name="personas"
          render={({ field }) => (
            <FormItem>
              <Label>{t("npn_persons")}</Label>
              <MultiSelectSearch
                options={options}
                selected={field.value}
                onChange={(item) => field.onChange(item)}
                placeholder={t("npn_sent_to_select")}
                disabled={isLoading}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
        >{t("npn_submit")}</Button>
      </form>
    </Form>
  );
}