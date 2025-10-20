import { parse, isValid } from 'date-fns';

export const maskDate = (value: string) => {
  const numeric = value.replace(/\D/g, '').slice(0, 8);

  const day = numeric.slice(0, 2);
  const month = numeric.slice(2, 4);
  const year = numeric.slice(4, 8);

  // Formato base
  let masked = '';
  if (day) masked += day;
  if (month) masked += '/' + month;
  if (year) masked += '/' + year;

  // Solo validar si tiene fecha completa
  if (day.length === 2 && month.length === 2 && year.length === 4) {
    const parsed = parse(`${day}/${month}/${year}`, 'dd/MM/yyyy', new Date());
    if (!isValid(parsed)) {
      // Fecha inválida: no actualizamos el valor
      return masked.slice(0, -1); // evitar agregar más si es inválida
    }
  }

  return masked;
};

export const maskDecimal = (value: string) => {
  // Solo permite números y un solo punto o coma
  const clean = value.replace(",", "."); // opcional: soporta coma como decimal
  const regex = /^\d*\.?\d*$/;
  if (regex.test(clean)) {
    return clean;
  }
}