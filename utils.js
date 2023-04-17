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