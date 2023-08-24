// Format a number to currency with $ ahead
export function formatCurrency(number: number): string {
  if (isNaN(number)) {
    return '';
  }
  const parts = number.toString().split('.');
  const integerPart = parts[0];
  let formattedNumber = '';

  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      formattedNumber = ',' + formattedNumber;
    }
    formattedNumber = integerPart[i] + formattedNumber;
  }
  return '$' + formattedNumber;
}
