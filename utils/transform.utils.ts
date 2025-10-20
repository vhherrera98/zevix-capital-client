export function regexNumber(value: string) {
  if (/^\d*$/.test(value)) {
    return Number(value);
  }
}

export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export function formatDateToDDMMYYYY(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate() + 1).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
