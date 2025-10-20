"use client";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogPortal,
 DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type CSSLengthUnit =
 | `${number}px`
 | `${number}rem`
 | `${number}em`
 | `${number}vh`
 | `${number}vw`
 | `${number}%`;

type Props = {
 children: React.ReactNode;
 trigger?: React.ReactNode;
 md?: CSSLengthUnit;
 lg?: CSSLengthUnit;
 className?: string;
 back?: boolean;
 title?: string;
 description?: React.ReactNode | string;
 open?: boolean;
 setOpen?: (value: boolean) => void;
};

export function ModalDialog({
 children,
 trigger,
 className,
 md,
 lg,
 back,
 title = "",
 description = "",
 open: controlledOpen,
 setOpen: controlledSetOpen,
}: Props) {
 const router = useRouter();
 const searchParams = useSearchParams();

 const isControlled =
  typeof controlledOpen === "boolean" && typeof controlledSetOpen === "function";

 const [internalOpen, setInternalOpen] = useState<boolean>(() => {
  return searchParams.get("modal") === "true" || back === true;
 });

 const open = isControlled ? controlledOpen : internalOpen;
 const setOpen = isControlled ? controlledSetOpen! : setInternalOpen;

 // 💡 Sincroniza el estado del modal con la URL
 const toggle = (value: boolean) => {
  if (back && value === false) {
   router.back();
  } else {
   setOpen(value);
  }
 };


 return (
  <Dialog open={open} onOpenChange={toggle}>
   <ButtonTrigger back={!!back} asChild={trigger} />
   <DialogPortal>
    <DialogContent
     className={cn(
      "max-h-[calc(100vh-50px)] overflow-y-auto w-full",
      md && `md:max-w-[${md}]`,
      lg && `lg:max-w-[${lg}]`,
      className
     )}
    >
     <DialogHeader className={cn(title || description ? "visible" : "hidden")}>
      <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
      {
       typeof description === 'string'
        ?
        <DialogDescription>{description}</DialogDescription>
        :
        description
      }
     </DialogHeader>
     <div className={!title || !description ? "mt-0" : "mt-4"}>
      {children}
     </div>
    </DialogContent>
   </DialogPortal>
  </Dialog>
 );
}

function ButtonTrigger({
 back,
 asChild,
}: {
 back: boolean;
 asChild: React.ReactNode;
}) {
 if (back && !asChild) return null;
 return <DialogTrigger asChild>{asChild}</DialogTrigger>;
}
