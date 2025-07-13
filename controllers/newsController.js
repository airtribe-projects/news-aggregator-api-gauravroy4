const { getNewsFromAPI } = require('../services/newsService');

exports.fetchNews = async (req, res) => {
  try {
    const { categories = [], language = 'en' } = req.user.preferences || {};

    if (!categories.length) {
      return res.status(400).json({ message: 'User has no news preferences set.' });
    }

    const articles = await getNewsFromAPI(categories, language);
    res.status(200).json({ articles });

  } catch (error) {
    console.error('News Fetch Error:', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch news. Please try again later.';
    res.status(status).json({ message });
  }
};
