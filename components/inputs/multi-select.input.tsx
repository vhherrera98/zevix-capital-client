"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Opcional si quieres mostrar badges abajo
import { useI18n } from "@/hooks/use-i18n";
import { ControllerFieldState } from "react-hook-form";

interface Option<T extends string | number> {
 label: string;
 value: T;
}

interface MultiSelectComboboxProps<T extends string | number> {
 options: Option<T>[];
 selected: T[];
 onChange: (values: T[]) => void;
 placeholder?: string;
 disabled?: boolean;
 className?: string;
 fieldState?: ControllerFieldState;
}

export function MultiSelectSearch<T extends string | number>({
 options,
 selected,
 onChange,
 placeholder = "Selecciona opciones...",
 disabled = false,
 fieldState
}: MultiSelectComboboxProps<T>) {
 const [open, setOpen] = React.useState(false);
 const { t } = useI18n();

 const toggleOption = (value: T) => {
  if (selected.includes(value)) {
   onChange(selected.filter((v) => v !== value));
  } else {
   onChange([...selected, value]);
  }
 };

 return (
  <Popover open={open} onOpenChange={setOpen}>
   <PopoverTrigger asChild>
    <Button
     variant="outline"
     role="combobox"
     aria-expanded={open}
     className={
      cn(
       "w-full justify-between",
       fieldState && fieldState.error && "border-red-400 dark:border-red-400"
      )
     }
     disabled={disabled}
    >
     {selected.length > 0
      ? `${selected.length} seleccionadas`
      : placeholder}
     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
   </PopoverTrigger>

   <PopoverContent className="w-full p-0">
    <div className="w-[--radix-popover-trigger-width] lg:w-[500px]">
     <Command>
      <CommandInput placeholder={t("search")}
      />
      <CommandEmpty>No hay resultados.</CommandEmpty>

      <CommandGroup
       className="max-h-60 overflow-y-auto" // 👈 aquí añadimos
      >
       {/* select all */}
       <CommandItem
        value="select-all"
        onSelect={() => {
         if (selected.length === options.length) {
          onChange([]);
         } else {
          onChange(options.map((option) => option.value));
         }
        }}
       >
        <div
         className={cn(
          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted",
          selected.length === options.length && "bg-primary text-primary-foreground"
         )}
        >
         {selected.length === options.length && (
          <Check className="h-4 w-4" />
         )}
        </div>
        {t("npn_sent_to_button")}
       </CommandItem>

       {options?.map((option) => (
        <CommandItem
         key={option.value}
         value={option.label}
         onSelect={() => toggleOption(option.value)}
        >
         <div
          className={cn(
           "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted",
           selected.includes(option.value) && "bg-primary text-primary-foreground"
          )}
         >
          {selected.includes(option.value) && (
           <Check className="h-4 w-4" />
          )}
         </div>
         {option.label}
        </CommandItem>
       ))}
      </CommandGroup>
     </Command>

     {/* Mostrar badges seleccionados opcionalmente */}
     {selected.length > 0 && (
      <div
       className="flex flex-wrap gap-1 px-2 py-2 border-t w-screen sm:max-w-[500px] lg:max-w-[500px]"
      >
       {selected.map(value => {
        const label = options.find(o => o.value === value)?.label ?? value
        return (
         <Badge
          key={value}
          variant="outline"
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => toggleOption(value)}
         >
          {label}
          <X
           className="h-3 w-3"
          />
         </Badge>
        )
       })}
      </div>
     )}
    </div>

   </PopoverContent>
  </Popover>
 );
}
