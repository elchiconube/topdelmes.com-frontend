export const getMonthName = (month) => {
  const date = new Date(2022, month);
  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
  return monthName;
}

export const updatePosterUrl = (url) => {
  const pattern = /_V1_.*\.jpg/;
  const newSuffix = "_V1_SY1000_CR0,0,674,1000_AL_.jpg";
  const newUrl = url.replace(pattern, newSuffix);
  return newUrl;
}

export const formatVotes = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
}

const isValidMonth = (month) => {
  console.log({month})
  const validMonths = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return validMonths.includes(month);
}

const isValidYear = (year, type) => {
  const firstYear = type === 'movies' ? 1920 : 1990;
  const currentYear = new Date().getFullYear();
  const parsedYear = parseInt(year);
  return parsedYear >= firstYear && parsedYear <= currentYear;
}

export const validateYearAndMonth = (year, month, type) => isValidYear(year, type) && isValidMonth(month);
