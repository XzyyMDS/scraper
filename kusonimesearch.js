const axios = require('axios');
const cheerio = require('cheerio');

async function kusonimeSearch(text) {
    try {
        const gtx = await axios.get("https://kusonime.com/?s=${encodeURIComponent(text)}&post_type=post", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
            }
        });
        const $ = await cheerio.load(gtx.data);
        const res = [];

        $('div.detpost').each((i, el) => {
            const title = $(el).find('.content h2.episodeye a').text().trim();
            const genre = $(el).find('.content p a').text().trim().split(/(?=[A-Z])/).join(', ');
            const image = $(el).find('.thumbz img').attr('src'):
                const link = $(el).find('.content a').attr('href');

            res.push({ title, genre, image, link });
        });

        return res;
    } catch (error) {
        console.error("Error:", error.message);
    }
};