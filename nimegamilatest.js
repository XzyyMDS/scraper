const axios = require('axios');
const cheerio = require('cheerio');

async function nimegamiLatest() {
    try {
        const sdz = await axios.get("https://nimegami.id/", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
            }
        });
        const $ = cheerio.load(sdz.data);
        const res = [];

        
      $('article[class=""]').each((i, el) => {
            const title = $(el).find('.info h2').text().trim();
            const link = $(el).find('.info a').attr('href');
            const image = $(el).find('.thumb img').attr('src');
            const rating = $(el).find('.top-post .rating').text().trim();
            const studio = $(el).find('li:contains("Studio")').text().split(':')[1]?.trim();
            const episode = $(el).find('li:contains("Episode")').text().split(':')[1]?.trim();
            const duration = $(el).find('li:contains("Duration")').text().split(':')[1]?.replace('per ep', '').trim();
            const genre = $(el).find('li:contains("Category")').text().split(':')[1]?.trim();

            res.push({
                title,
                link,
                image,
                rating,
                studio,
                episode,
                duration,
                genre
            });
        });

        return res;
    } catch (error) {
        console.error("Error:", error.message);
    }
};