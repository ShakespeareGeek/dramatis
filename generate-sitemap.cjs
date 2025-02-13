const fs = require('fs');
const plays = require('./public/data/plays.json'); // Your plays data
const characters = require('./public/data/characters.json'); // Your characters data

const baseUrl = 'https://www.shakespearegeek.com';

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home page -->
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Plays -->
  ${plays.map(play => `
  <url>
    <loc>${baseUrl}/shakespeare_plays/${play.slug}.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  
  <!-- Characters -->
  ${characters.map(character => `
  <url>
    <loc>${baseUrl}/shakespeare_characters/${character.slug}.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('./public/shakespeare_sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();