const axios = require('axios');
const cheerio = require('cheerio');

async function sfileSearch(name, page = 1)
    let headers = {
'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
    };
    try {
      const ftx = await axios.get(`https://sfile.co/search?q=${name}&page=${page}`, { headers });
      const $ = await cheerio.load(ftx.data);
      const res = [];

    $('div.min-w-0.flex-1').each((index, element) => {
      const name = $(element).find('a').text().trim();
      const mime = $(element).find('a').text().split('.').pop().trim();
      const size = $(element).find('p').text().trim().split('•').shift();
      const date = $(element).find('p').text().trim().split('•').pop();
      const link = $(element).find('a').attr('href');

    res.push({ name, mime, size, date, link });
    });

    return res;
    } catch (error) {
  console.error("Error:", error.message);
    }
};