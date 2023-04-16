// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')

const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/series', priority: 0.8, changefreq: 'monthly' },
    { url: '/peliculas', priority: 0.8, changefreq: 'monthly' },
]

const sitemap = new SitemapStream({ hostname: 'https://www.topdelmes.com' })

sitemap.pipe(createWriteStream('./public/sitemap.xml'))

pages.forEach((page) => {
    sitemap.write(page)
})

sitemap.end()
