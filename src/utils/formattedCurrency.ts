export function formattedCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export function formattedCurrencyWithDeviser(value: number, deviser: number) {
  return (value / deviser).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
