const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const pages = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/series", priority: 0.8, changefreq: "monthly" },
  { url: "/peliculas", priority: 0.8, changefreq: "monthly" },
];

for (let year = 1990; year <= currentYear; year++) {
  for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
    if (year === currentYear && monthIndex > currentMonth) break;
    pages.push({ url: `/series/${year}/${months[monthIndex]}`, priority: 0.8, changefreq: "monthly" });
  }
}

for (let year = 1920; year <= currentYear; year++) {
  for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
    if (year === currentYear && monthIndex > currentMonth) break;
    pages.push({ url: `/peliculas/${year}/${months[monthIndex]}`, priority: 0.8, changefreq: "monthly" });
  }
}

const sitemap = new SitemapStream({ hostname: "https://www.topdelmes.com" });

sitemap.pipe(createWriteStream("./public/sitemap.xml"));

pages.forEach((page) => {
  sitemap.write(page);
});

sitemap.end();
