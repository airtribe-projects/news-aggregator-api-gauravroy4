const bcrypt = require('bcryptjs');

const users = []; // In-memory user "database"
const rounds = 10; // bcrypt salt rounds

class User {
  constructor({ name, email, password, role = 'user', preferences = [] }) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.preferences = preferences; // Should be array like ['movies', 'comics']
    this.createdAt = new Date();
  }

  static async create({ name, email, password, role, preferences = [] }) {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, rounds);
    const user = new User({ name, email, password: hashedPassword, role, preferences });
    users.push(user);
    return user;
  }

  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  async comparePassword(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  }

  updatePreferences(preferences) {
    if (Array.isArray(preferences)) {
      this.preferences = preferences;
    }
  }
  
  // Serialize user without sensitive data
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      preferences: this.preferences,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
