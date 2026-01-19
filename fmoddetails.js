const axios = require('axios');
const cheerio = require('cheerio');

async function fmodDetails(url) {
  try {
    const dsx = await axios.get(url);
    const $ = await cheerio.load(dsx.data);
    const res = [];

    const name = $('table.table > tbody').find('td').eq(0).text()
    const image = $('div.row').first().find('img').attr('data-src')
    const publisher = $('table.table > tbody').find('td').eq(2).text()
    const genre = $('table.table > tbody').find('td').eq(3).text()
    const size = $('table.table > tbody').find('td').eq(4).text()
    const version = $('table.table > tbody').find('td').eq(5).text()
    const updateDate = $('table.table > tbody').find('td').eq(6).text()

    res.push({ name, image, publisher, genre, size, version, updateDate });

    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};