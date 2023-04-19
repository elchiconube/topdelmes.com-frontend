const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const axios = require("axios");
require("dotenv").config();


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
  { url: "/analisis", priority: 0.8, changefreq: "daily" },
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

async function fetchPostsAndGenerateSitemap() {
  try {

    const response = await axios.get(`${process.env.API_URL_POST}/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_POST}`,
      }
    });
    const posts = response.data.data;

    posts.forEach((post) => {
      const slug = post.attributes.slug;
      pages.push({ url: `/analisis/${slug}`, priority: 0.8, changefreq: "daily" });
    });

    const sitemap = new SitemapStream({ hostname: "https://www.topdelmes.com" });

    sitemap.pipe(createWriteStream("./public/sitemap.xml"));

    pages.forEach((page) => {
      sitemap.write(page);
    });

    sitemap.end();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

fetchPostsAndGenerateSitemap();
