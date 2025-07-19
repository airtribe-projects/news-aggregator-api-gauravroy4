const { getNewsFromAPI } = require('../services/newsService');

exports.fetchNews = async (req, res) => {
  try {
    const preferences = req.user.preferences;
    if (!preferences || !preferences.length) {
      return res.status(400).json({ message: 'User has no news preferences set.' });
    }

    const articles = await getNewsFromAPI(preferences);

    return res.status(200).json({ news: articles });
  } catch (error) {
    console.error('News Fetch Error:', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch news. Please try again later.';
    return res.status(status).json({ message });
  }
};
