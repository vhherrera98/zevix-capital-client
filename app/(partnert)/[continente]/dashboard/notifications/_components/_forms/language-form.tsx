/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/hooks/use-i18n";
import { Control, FieldValues } from "react-hook-form";

type Props = {
 name: string;
 title: string;
 description: string;
 control: Control<any, any, FieldValues>;
 disabled?: boolean;
}

export function LanguageForm({
 name,
 control,
 title,
 description,
 disabled = false
}: Props) {

 const { t } = useI18n();

 return (
  <Card className="border-none shadow-none px-0 dark:bg-transparent">
   <CardHeader>
    <CardTitle className="text-right">
     {name}
    </CardTitle>
   </CardHeader>
   <CardContent className="grid grid-cols-1 gap-5 px-0">
    <FormField
     control={control}
     name={title}
     render={({ field }) => (
      <FormItem>
       <Label>{t("npn_title_input")}</Label>
       <Input
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        placeholder={t("npn_title_placeholder")}
        disabled={disabled}
       />
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={control}
     name={description}
     render={({ field }) => (
      <FormItem>
       <Label>{t("npn_description_input")}</Label>
       <Textarea
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        placeholder={t("npn_description_placeholder")}
        disabled={disabled}
       />
       <FormMessage />
      </FormItem>
     )}
    />
   </CardContent>
  </Card>
 )
}