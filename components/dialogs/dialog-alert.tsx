"use client";

import * as React from "react";
import {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
 DialogFooter,
 DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button"; // Tu botón personalizado importado
import { useI18n } from "@/hooks/use-i18n";

interface DialogAlertProps {
 triggerLabel: React.ReactNode;
 title: React.ReactNode;
 description?: React.ReactNode;
 onContinue: () => void;
 triggerButtonProps?: React.ComponentProps<typeof Button>;
}

export function DialogAlert({
 triggerLabel,
 title,
 description,
 onContinue,
 triggerButtonProps,
}: DialogAlertProps) {

 const { t } = useI18n();

 const [open, setOpen] = React.useState(false);

 const handleContinue = () => {
  onContinue();
  setOpen(false);
 };

 return (
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
    <Button {...triggerButtonProps}>{triggerLabel}</Button>
   </DialogTrigger>

   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>{title}</DialogTitle>
     {description && <DialogDescription>{description}</DialogDescription>}
    </DialogHeader>

    <DialogFooter className="space-x-2">
     <DialogClose asChild>
      <Button variant="outline">{t("dialog_cancel")}</Button>
     </DialogClose>

     <Button onClick={handleContinue} variant="destructive">
      {t("dialog_continue")}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
