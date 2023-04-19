import { remark } from 'remark';
import html from 'remark-html';

export const markdownToHtml = (markdownString) => {
  const result = remark().use(html).processSync(markdownString);
  return result.toString();
}

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

export const getPrevNextYearMonth = (yearStr, monthStr, type) => {
  const MONTH_NAMES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const year = parseInt(yearStr, 10);
  const month = getMonthNumber(monthStr);
  const isMovies = type === 'movies';
  const isSeries = type === 'series';
  const prevYear = month === 1 && isMovies ? year - 1 : year;
  const nextYear = month === 12 && isSeries ? year + 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextMonth = month === 12 ? 1 : month + 1;
  const prevMonthDate = new Date(prevYear, prevMonth - 1, 1);
  const nextMonthDate = new Date(nextYear, nextMonth - 1, 1);
  const now = new Date();

  const prev = prevMonthDate.getFullYear() >= (isMovies ? 1920 : 1990)
      ? { year: prevMonthDate.getFullYear(), month: MONTH_NAMES[prevMonthDate.getMonth()] }
      : null;

  const next = nextMonthDate <= now
      ? { year: nextMonthDate.getFullYear(), month: MONTH_NAMES[nextMonthDate.getMonth()] }
      : null;

  return { prev, next };
};


export const formatVotes = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
}

const isValidMonth = (month) => {
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

export const getMonthNumber = (month) => {
  const months = {
    enero: 1,
    febrero: 2,
    marzo: 3,
    abril: 4,
    mayo: 5,
    junio: 6,
    julio: 7,
    agosto: 8,
    septiembre: 9,
    octubre: 10,
    noviembre: 11,
    diciembre: 12
  };

  const lowercaseMonth = month.toLowerCase();
  const monthNumber = months[lowercaseMonth];

  if (monthNumber === undefined) {
    throw new Error(`Mes desconocido: ${month}`);
  }

  return monthNumber;
}

const generateUrls = (prefix, actualMonth, actualYear, months) => {
  return Array.from({ length: 6 }, (_, i) => {
    const index = (actualMonth - i + 12) % 12;
    const year = actualMonth - i < 0 ? actualYear - 1 : actualYear;
    return {
      url: `/${prefix}/${year}/${months[index]}`,
      month: months[index],
      year: year,
    };
  });
};

export const getPreviousMonths = () => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const actualDate = new Date();
  const actualMonth = actualDate.getMonth();
  const actualYear = actualDate.getFullYear();

  const movies = generateUrls("peliculas", actualMonth, actualYear, months);
  const series = generateUrls("series", actualMonth, actualYear, months);

  return { movies, series };
};

export const isCurrentMonthAndYear = ( year, month ) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long' }).toLowerCase();

  return year === currentYear && month.toLowerCase() === currentMonth;
};


export const postFormatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
