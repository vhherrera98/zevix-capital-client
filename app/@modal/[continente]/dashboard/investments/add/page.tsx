"use client";

import { VoucherForm } from "@/components/forms/vouchers/Voucher-form";
import { ModalDialog } from "@/components/modal";
import { useI18n } from "@/hooks/use-i18n";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PageAddVoucher() {

 const { t } = useI18n();
 const session = useSession();

 if(!session?.data?.user?.verified) return redirect("/dashboard/investments");

 return (
  <ModalDialog
   back
   title={t("voucher_form_title")}
   description={t("voucher_form_subtitle")}
   className="md:max-w-[600px]"
  >
   <div className="flex flex-col gap-4">
    <p className="text-muted-foreground text-xs">{t("voucher_form_hint")}</p>
    <VoucherForm />
   </div>
  </ModalDialog>
 )

}