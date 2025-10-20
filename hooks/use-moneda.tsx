import { useMemo } from "react";

type MonedaInfo = {
  simbolo: string;
  nombre: string;
};

const MONEDAS: Record<string, Record<string, MonedaInfo>> = {
  USD: {
    es: { simbolo: "$", nombre: "Dólares" },
    en: { simbolo: "$", nombre: "Dollars" },
  },
  BOB: {
    es: { simbolo: "Bs", nombre: "Bolivianos" },
    en: { simbolo: "Bs", nombre: "Bolivians" },
  },
  EUR: {
    es: { simbolo: "€", nombre: "Euros" },
    en: { simbolo: "€", nombre: "Euros" },
  },
  BTC: {
    es: { simbolo: "₿", nombre: "Bitcoin" },
    en: { simbolo: "₿", nombre: "Bitcoin" },
  },
};

export function useMoneda(langFromProps?: string) {
  const lang = useMemo(() => {
    if (langFromProps) return langFromProps.toLowerCase();
    if (typeof window !== "undefined") {
      return navigator.language.slice(0, 2); // 'es-BO' -> 'es'
    }
    return "es";
  }, [langFromProps]);

  const getMoneda = (codigo: string): MonedaInfo => {
    const upper = codigo.toUpperCase();
    return (
      MONEDAS[upper]?.[lang] ?? {
        simbolo: upper,
        nombre: upper,
      }
    );
  };

  const formatMoneda = (monto: number | string, codigo: string): string => {
    // const moneda = getMoneda(codigo);

    const number = typeof monto === "string" ? parseFloat(monto) : monto;

    return new Intl.NumberFormat(lang === "es" ? "es-BO" : "en-US", {
      style: "currency",
      currency: codigo,
      currencyDisplay: "symbol",
    }).format(number);
  };

  return { getMoneda, formatMoneda };
}
