'use client';

import { AcceptedFileTypes, FileUploader } from "@/components/inputs/file-upload-control";
import { InputControl } from "@/components/inputs/input-control";
import { PageLoader } from "@/components/loaders/page-loader";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { maskDate } from "@/utils/masks.utils";
import { regexNumber } from "@/utils/transform.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateDocument, DocumentSchema } from "./dni-schema";
import { useUploadBeneficiaryDocumentMutation, useUploadPersonalDocumentMutation } from "@/lib/Redux/web/endpoints/documents/upload";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/use-i18n";

export function PassportForm({
  beneficiaryId
}: {
  beneficiaryId?: number
}) {

  const router = useRouter();
  const { t } = useI18n();

  const [mounted, setMounted] = useState<boolean>(false);
  const [uploadDocument] = useUploadPersonalDocumentMutation();
  const [uploadDocumentForBeneficiary] = useUploadBeneficiaryDocumentMutation();

  const form = useForm<CreateDocument>({
    mode: "all",
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      numero_identificacion: 0,
      fecha_emision: "",
      fecha_expiracion: "",
      tipo_documento: "PASS",
      documento: []
    }
  });
  const { control, handleSubmit } = form;

  const submit = async (data: CreateDocument) => {
    try {
      if (!beneficiaryId) {
        await uploadDocument(data)
          .unwrap()
          .then((response) => {
            toast(response.data || response.message);
            router.back();
          });
      } else {
        await uploadDocumentForBeneficiary({ beneficiaryId, data })
          .unwrap()
          .then((response) => {
            toast(response.data || response.message);
            router.back();
          });
      }
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;

      const message =
        'data' in err && typeof err.data === 'object' && err.data !== null && 'message' in err.data
          ? (err.data as { message: string }).message
          : 'INTERNAL ERROR';

      toast(message);
    }
  }

  useEffect(() => setMounted(true), []);
  if (!mounted) return <PageLoader />;


  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-1 gap-5"
      >
        <div className="w-full max-w-[450px] grid grid-cols-1 gap-5">

          <FormField
            control={control}
            name="numero_identificacion"
            render={({ field, fieldState }) => (
              <InputControl
                value={field.value}
                onChange={(e) => field.onChange(regexNumber(e.target.value))}
                label={t("form_numero_identificacion_label")}
                placeholder={t("form_numero_identificacion_placeholder")}
                fieldState={fieldState}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

            <FormField
              control={control}
              name="fecha_emision"
              render={({ field, fieldState }) => (
                <InputControl
                  value={field.value}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                  label={t("form_fecha_emision_label")}
                  placeholder={t("form_fecha")}
                  fieldState={fieldState}
                />
              )}
            />

            <FormField
              control={control}
              name="fecha_expiracion"
              render={({ field, fieldState }) => (
                <InputControl
                  value={field.value}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                  label={t("form_fecha_expiracion_label")}
                  placeholder={t("form_fecha")}
                  fieldState={fieldState}
                />
              )}
            />

          </div>
        </div>

        <FormField
          control={control}
          name="documento"
          render={({ field, fieldState }) => (
            <FileUploader
              title={t("input_file_label")}
              description={t("input_file_placeholder_accept", { types: "PDF" })}
              buttonText={t("choose_file")}
              accept={[AcceptedFileTypes.PDF]}
              value={field.value}
              onChange={(event) => field.onChange(event)}
              fieldState={fieldState}
            />
          )}
        />

        <Button
          type="submit"
        >
          {t("form_upload_submit")}
        </Button>

      </form>
    </Form>
  );
}
