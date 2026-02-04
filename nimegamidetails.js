const axios = require('axios');
const cheerio = require('cheerio');

async function nimegamiDetails(url) {
    try {
        const fgx = await axios.get(url);
        const $ = await cheerio.load(fgx.data);
        const result = [];

        const judul = $('div.info2').find('td.tablex + td').eq(0).text().trim();
        const image = $('div.thumbnail-a').find('img').attr('src');
        const durasi = $('div.info2').find('td.tablex + td').eq(2).text().trim();
        const rating = $('div.info2').find('td.ratingx').text().replace('[MAL]', '').trim();
        const studio = $('div.info2').find('td.tablex + td').eq(4).text().trim();
        const genre = $('div.info2').find('td.tablex + td').eq(5).text().trim();
        const rilis = $('div.info2').find('td.tablex + td').eq(6).text().trim();

        result.push({
            judul,
            image,
            durasi,
            rating,
            studio,
            genre,
            rilis
        });
        return result;

    } catch (error) {
        console.error("Error:", error.message)
    }
};

module.exports = { nimegamiDetails };