const { v4: uuidv4 } = require('uuid');

const users = [];

class Users {
    constructor({ name, email, password, role, preferences, _id }, skipPush = false) {
        this._id = _id || uuidv4();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.preferences = preferences;
        if (!skipPush) users.push(this);
    }

    static findOne(query) {
        return Promise.resolve(users.find(user =>
            Object.keys(query).every(key => user[key] === query[key])
        ) || null);
    }
    static findById(id) {
        return Promise.resolve(users.find(user => user._id === id) || null);
    }

    select(fields) {
        // clone this user but don't push to users array
        const cloned = new Users({
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            preferences: this.preferences,
            _id: this._id // preserve the same _id
        }, true);
        if (fields && fields.startsWith('-')) {
            const field = fields.slice(1);
            delete cloned[field];
        }
        return cloned;
    }

    // Save changes to the in-memory user and return a Promise (async)
    async save() {
        // Find the current user in `users` array and update it (not strictly necessary for objects, but mimics DB)
        const idx = users.findIndex(u => u._id === this._id);
        if (idx !== -1) {
            users[idx] = this;
        }
        return this;
    }
}

module.exports = Users;
