/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

type Option = {
 label: string;
 value: number | string;
 [key: string]: any;
};

function normalizeKey(label: string): string {
 return label
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\s+/g, '');
}

export function useTranslatedOptions(
 options: Option[] | undefined,
 t: (key: string) => string
) {
 return useMemo(() => {
  if (!options) return [];
  return options.map((option) => {
   return {
    ...option,
    label: t(normalizeKey(option.label)) || option.label,
   }
  });
 }, [options, t]);
}
