const axios = require('axios');
const config = require('../config/config');

/**
 * Fetch news articles from the News API
 * @param {string[]} categories - e.g. ["technology", "sports"]
 * @param {string} language
 * @returns {Promise<Object[]>}
 */
const getNewsFromAPI = async (categories, language = 'en') => {
  if (!config.NEWS_API_KEY) {
    throw new Error('Missing NEWS_API_KEY in environment variables');
  }
  if (!categories || !categories.length) {
    throw new Error('Missing or empty categories');
  }

  const query = categories.join(' OR ');
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&pageSize=10&apiKey=${config.NEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (!response.data.articles) throw new Error('Invalid news API response');
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = { getNewsFromAPI };
