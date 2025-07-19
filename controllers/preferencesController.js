exports.getPreferences = async (req, res) => {
  try {
    var preferences = req.user.preferences;
    console.log("Fetching preferences for user:", req.user.id, "Preferences:", preferences);
    return res.status(200).json({
      preferences: preferences,
    });
  } catch (err) {
    console.error('Get Pref Error:', err.message);
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

    req.user.updatePreferences(preferences);

    return res.status(200).json({
      message: 'Preferences updated',
      preferences: req.user.preferences,
    });
  } catch (err) {
    console.error('Update Pref Error:', err.message);
    return res.status(500).json({ message: 'Server error updating preferences' });
  }
};
