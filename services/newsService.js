const axios = require('axios');

/**
 * Fetch news articles based on user preferences
 * @param {string[]} categories - e.g., ["technology", "sports"]
 * @param {string} language - e.g., "en", "hi"
 * @returns {Promise<Object[]>} - Array of formatted news articles
 */
const getNewsFromAPI = async (categories, language = 'en') => {
  if (!process.env.NEWS_API_KEY) {
    throw new Error('Missing NEWS_API_KEY in environment variables');
  }

  const query = categories.join(' OR ');
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  const response = await axios.get(url);

  return response.data.articles.map(article => ({
    title: article.title,
    description: article.description,
    source: article.source.name,
    url: article.url,
    publishedAt: article.publishedAt,
  }));
};

module.exports = {
  getNewsFromAPI,
};
