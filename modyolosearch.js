const axios = require('axios');
const cheerio = require('cheerio');

async function modyoloSearch(text) {
    const gsx = await axios.get(`https://modyolo.com/?s=${text}`);
    const $ = cheerio.load(gsx.data);
    const res = [];

    $('div.col-xl-4').each((_, e) => {
        const title = $(e).find('h3').text().trim();
        const link = $(e).find('a').attr('href');
        const image = $(e).find('img').attr('src');
        const version = $(e).find('span.align-middle').eq(0).text().trim();
        const size = $(e).find('span.align-middle').eq(2).text().trim();
        const mod = $(e).find('span.align-middle').eq(3).text().trim():

            res.push({
                title,
                link,
                image,
                version,
                size,
                mod
            });
    });
    return res;

} catch (error) {
    console.error("Error:" + error.message);
    }
};