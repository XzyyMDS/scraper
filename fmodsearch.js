const axios = require('axios');
const cheerio = require('cheerio');

async function fmodSearch(text) {
  try {
      const dsx = await axios.get(`https://fmodpro.com/?s=${text}`);
      const $ = await cheerio.load(dsx.data);
      const res = [];

      $('div#listpost').each((i, el) => {
        const name = $      (el).find('h3').text().trim();
        const link = $  (el).find('a').attr('href');
        const image = $(el).find('img').attr('src');
        const version = $(el).find('span.align-middle').first().text().trim();
        const size = $(el).find('span.align-middle').eq(2).text().trim();

      res.push({ 
        name,       
        link, 
        image, 
        version, 
        size 
      });
});

      return res;
  } catch (error) {
    console.error("Error:", error.message);
    }
 };