const axios = require('axios');
const cheerio = require('cheerio');

async function oploverzOngoing() {
    try {
        const ztx = await axios.get("https://oploverz.org/ongoing/");
        const $ = cheerio.load(ztx.data);
        const res = [];

        $('div.bg-white a').each((i, e) => {
            const title = $(e).find('div.titlelist').text().trim();
            const link = $(e).attr('href');
            const image = $(e).find('img').attr('src');
            const episode = $(e).find('div.eplist').text().replace('Episode', '').trim();
            const rating = $(e).find('div.starlist').text().trim() || "Unknown";

            res.push({
                title,
                link,
                image,
                episode,
                rating
            });
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { oploverzOngoing };