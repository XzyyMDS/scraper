const axios = require('axios');
const cheerio = require('cheerio');

async function nimegamiOngoing() {
    try {
        const jfx = await axios.get("https://nimegami.id/anime-terbaru-sub-indo");
        const $ = await cheerio.load(jfx.data);
        const res = [];

        $('article').each((i, el) => {
            const title = $(el).find('h3').text().trim();
            const link = $(el).find('h3 > a').attr('href');
            const image = $(el).find('div.thumb img').attr('src');
            const episode = $(el).find('div.eps_ongo').text().replace('Eps.', '').trim();
            res.push({
                title,
                link,
                image,
                episode
            });
        });
        return res;

    } catch (error) {
        console.error("Error:", error.message);
    }
};