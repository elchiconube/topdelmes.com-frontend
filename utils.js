export const getMonthName = (month) => {
  const date = new Date(2022, month);
  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
  return monthName;
}