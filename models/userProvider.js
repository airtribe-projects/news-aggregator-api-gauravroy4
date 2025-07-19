const config = require('../config/config');

let Users;

if (config.useMongoDB) {
  // Use the MongoDB/Mongoose model
  Users = require('./usersModel');
} else {
  // Use the in-memory Users class
  Users = require('../db/inMemoryDB');
}

module.exports = Users;
