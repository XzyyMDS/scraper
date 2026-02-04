const axios = require('axios');
const cheerio = require('cheerio');

async function mediafiredl(url) {
    try {
        const rdx = await axios.get(url);
        const $ = await cheerio.load(rdx.data);
        const res = [];

        const name = $('div.dl-info').find('div.filename').first().text();
        const mimetype = $('div.dl-info').find('div.filename').first().text().split(".").pop() || "bin";
        const size = $('div.dl-info').find('ul.details span').first().text().trim();
        const uploadDate = $('div.dl-info').find('ul.details span').last().text().trim();
        const link = $('#downloadButton').attr('href');

        res.push({ name, mimetype, size, uploadDate, link });

        return {
            name,
            mimetype,
            size,
            uploadDate,
            link
        };

    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    };
};

module.exports = { mediafiredl };