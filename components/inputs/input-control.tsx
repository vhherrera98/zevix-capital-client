"use client";

import { ControllerFieldState } from "react-hook-form";
import { FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type Props = {
 label?: string;
 placeholder?: string;
 fieldState?: ControllerFieldState;
 action?: React.ReactNode;
} & React.ComponentProps<"input">

export function InputControl({
 className,
 type = "text",
 value,
 onChange,
 label,
 placeholder = "",
 fieldState,
 action,
 ...props
}: Props) {
 return (
  <FormItem>
   {label && <Label className="-mb-1 text-xs">{label}</Label>}
   <div className="w-full flex flex-row items-center justify-start">
    <Input
     value={value}
     onChange={onChange}
     placeholder={placeholder}
     className={cn(
      fieldState && fieldState.error && "border-red-400",
      className
     )}
     type={type}
     {...props}
    />
    {action}
   </div>
   <FormMessage className="text-right" />
  </FormItem >
 )


}