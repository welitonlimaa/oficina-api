const axios = require('axios')
const cheerio = require('cheerio')

const fetchData = async (url) => {
  const result = await axios.get(url)
  return result.data
}

const mlScraping = async ({ carPart, carName, model, ano }) => {
  const search = await fetchData(`https://lista.mercadolivre.com.br/${carPart}-${carName}-${model}-${ano}`);
  const $ = cheerio.load(search)
  let links = [];

  $('.ui-search-result__image > a').each((i, e) => {
    links.push($(e).attr('href'));
  });

  const data = await Promise.all(links.slice(0, 4).map(async (link) => {
    const page = await fetchData(link);
    const $ = cheerio.load(page);

    const title = $('h1').text();
    const urlImg = $('.ui-pdp-gallery__figure > img').attr('src');
    const description = $('.ui-pdp-description__content').text();
    const price = $('.andes-money-amount > meta').attr('content');
    // const tags = [];
    // $('.andes-table__column--value').each((i, e) => {
    //   tags.push($(e).text());
    // });

    return {
      urlImg,
      title,
      description,
      price,
      urlProduct: link,
      website: 'Mercado Livre',
      carPart,
      model,
      ano,
      carName
    }
  }));
  console.log(data);

  return data;
}

module.exports = mlScraping;