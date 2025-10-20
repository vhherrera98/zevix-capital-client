"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useMemo } from "react";
import 'moment/locale/es'; // Importa la localización en español
import { getLangClient } from "@/utils/getLang.client";

export function useDateMemo(date: string, format?: string) {

 const lang = getLangClient() || "en";
 moment.locale(lang);

 const date$ = useMemo(() => {
  const now = moment(date);
  return now.format(format || 'DD [de] MMMM [de] YYYY (HH:mm)');
 }, [date, lang]);

 return date$;
}