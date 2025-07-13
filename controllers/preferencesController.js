exports.getPreferences = async (req, res) => {
  try {
    const { preferences } = req.user;
    res.status(200).json({ preferences });
  } catch (err) {
    console.error('Get Pref Error:', err.message);
    res.status(500).json({ message: 'Server error fetching preferences' });
  }
};

exports.updatePreferences = async (req, res) => {
  const { categories, language } = req.body;

  try {
    req.user.preferences = {
      categories: categories || req.user.preferences.categories,
      language: language || req.user.preferences.language,
    };

    await req.user.save();
    res.status(200).json({ message: 'Preferences updated', preferences: req.user.preferences });
  } catch (err) {
    console.error('Update Pref Error:', err.message);
    res.status(500).json({ message: 'Server error updating preferences' });
  }
};
