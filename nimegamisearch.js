const axios = require('axios');
const cheerio = require('cheerio');

async function nimegamiSearch(text) {
        try {
            const fgx = await axios.get(`https://nimegami.id/?s=${text}&post_type=post`);
            const $ = await cheerio.load(fgx.data);
            const result = [];

            $('article').each((i, el) => {
                const judul = $(el).find('h2 > a').text().trim();
                const link = $(el).find('.thumbnail a').attr('href');
                const image = $(el).find('.thumbnail img').attr('src');
                const rating = $(el).find('.rating-archive').text().trim()
                const status = $(el).find('.term_tag-a > a').text() || 'N/A';

                result.push({
                    judul,
                    link,
                    image,
                    rating,
                    status
                });
            });

            return result;
        } catch (error) {
            console.error("Unexpected error:", error);
            }
        };

module.exports = { nimegamiSearch };