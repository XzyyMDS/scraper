const axios = require('axios');
const cheerio = require('cheerio');

async function fmodLatest() {
  try {
      const response = await axios.get("https://fmodpro.com/");
      const $ = await cheerio.load(response.data);
      const res = [];

      $('div#listpost').each((i, el) => {
        const title = $(el).find('h3').text().trim();
        const link = $(el).find('a').first().attr('href');
        const image = $(el).find('img').attr('data-src');
        const version = $(el).find('span.align-middle').eq(0).text().trim();
        const size = $(el).find('span.align-middle').eq(2).text().trim();

        res.push({ title, link, image, version, size });
      });

    return res;
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
};

module.exports = { fmodLatest };