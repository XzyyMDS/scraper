const axios = require('axios');
const cheerio = require('cheerio');

async function openapkSearch(text) {
    try {
        const jzx = await axios.get(`https://www.openapk.net/id/search/?q=${text}`);
        const $ = cheerio.load(jzx.data);
        const res = [];

        $('a.list-item').each((i, e) => {
            const title = $(e).find('p.list-info span.name').text().trim();
            const link = "https://www.openapk.net" + $(e).attr('href');
            const description = $(e).find('p.list-info span.desc').first().text().trim();
            const star = $(e).find('p.list-info span.desc').last().text().replace('★', '').trim();

            res.push({
                title,
                link,
                description,
                star
            });
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { openapkSearch };