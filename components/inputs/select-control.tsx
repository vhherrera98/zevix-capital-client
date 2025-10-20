"use client";

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { ControllerFieldState } from "react-hook-form";
import { FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type Option = {
 label: string;
 value: string | number;
};

type Props = {
 label?: string;
 placeholder?: string;
 options: Option[];
 value?: string;
 onChange?: (value: string) => void;
 fieldState?: ControllerFieldState;
 className?: string;
 disabled?: boolean;
};

export function SelectControl({
 label,
 placeholder = "Selecciona una opción",
 options,
 value,
 onChange,
 fieldState,
 className,
 disabled = false,
}: Props) {

 const showPlaceholder = typeof value === 'string' && Number(value) === 0 ? "" : value;

 return (
  <FormItem className={className}>
   {label && <Label className="-mb-1 text-xs">{label}</Label>}

   <Select
    value={showPlaceholder}
    onValueChange={onChange}
    disabled={disabled}
   >
    <SelectTrigger
     className={cn(
      fieldState?.error && "border-red-400",
      "w-full text-left"
     )}
    >
     <SelectValue placeholder={placeholder} />
    </SelectTrigger>

    <SelectContent>
     {options.map((option) => (
      <SelectItem key={option.value} value={String(option.value)}>
       {option.label}
      </SelectItem>
     ))}
    </SelectContent>
   </Select>

   <FormMessage className="text-xs text-right -mt-1" />
  </FormItem>
 );
}
