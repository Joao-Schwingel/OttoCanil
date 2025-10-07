/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.ottocanil.com',

  generateRobotsTxt: true,

  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',

        allow: '/', // permite indexar o resto do site

        disallow: ['/admin'] // bloqueia a rota administrativa
      }
    ]
  }
};
