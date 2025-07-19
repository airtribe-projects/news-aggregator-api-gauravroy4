exports.getPreferences = async (req, res) => {
  try {
    var preferences = req.user.preferences;
    return res.status(200).json({
      preferences: preferences,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error fetching preferences' });
  }
};

// PUT update user preferences (handles { preferences: [...] } input)
exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    if (!Array.isArray(preferences)) {
      return res.status(400).json({ message: 'Preferences must be an array.' });
    }

    await req.user.updatePreferences(preferences);

    return res.status(200).json({
      message: 'Preferences updated',
      preferences: req.user.preferences,
    });
  } catch (err) {
    console.error('Update Pref Error:', err.message);
    return res.status(500).json({ message: 'Server error updating preferences' });
  }
};
