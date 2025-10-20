/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

export function useCurrencyMemo(moneda: { abrev: string }, monto: number) {

  const currency = useMemo(() => {
    const curr = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: moneda.abrev
    });
    return curr.format(monto)
  }, [monto])

  return currency;
}