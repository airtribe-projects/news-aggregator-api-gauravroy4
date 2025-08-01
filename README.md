# 📰 News Aggregator API

A simple RESTful API built with Node.js and Express.js for:

- **User Registration & Authentication (JWT based)**
- **User News Preferences Management**
- **News Fetching from External API (based on user preferences)**
- **Switchable Storage: In-Memory or MongoDB**

## 🚀 Features

- ✅ User Signup & Login with JWT
- ✅ Password Hashing with bcrypt
- ✅ Protected Routes with JWT Middleware
- ✅ User Preferences (Categories & Language)
- ✅ External News Fetching (via News API service)
- ✅ Input Validation & Error Handling
- ✅ **Switch easily between In-Memory and MongoDB storage**
- ✅ Clean modular structure, scalable for future growth

## 🛠️ Tech Stack

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- dotenv
- axios (for external news fetching)
- uuid (for in-memory IDs)
- mongoose (when using MongoDB)

## ⚙️ Storage Modes: In-Memory vs. MongoDB

This project can be run in either:

| Storage Mode      | Purpose                                            | How to Enable                                                 |
|-------------------|----------------------------------------------------|---------------------------------------------------------------|
| **In-Memory**     | Fast, stateless, demo/testing, no external DB      | `NODE_ENV` is not 'production'                                |
| **MongoDB**       | Persistent storage for production and development  | `NODE_ENV=production` and set `MONGO_URI` in `.env` file      |

- **Switching is automatic** based on your `.env` settings:  
  Set `NODE_ENV=production` to use MongoDB, or leave unset/use another value for in-memory mode.
- **All models and controller logic** work seamlessly in both modes due to the dynamic model provider pattern.

## 📁 Project Structure
```
├── config/
│   ├── config.js
│   ├── constants.js
│   └── dbConnection.js
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── newsController.js
│   │   └── preferencesController.js
│   ├── db/
│   │   └── inMemoryDB.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── requestLogger.js
│   │   ├── validationHandler.js
│   │   └── validators/
│   ├── models/
│   │   ├── userProvider.js       # Switches between MongoDB and in-memory User model
│   │   └── usersModel.js         # MongoDB User schema/model
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── newsRoutes.js
│   │   └── preferencesRoutes.js
│   ├── services/
│   │   └── newsService.js
│   ├── utils/
│   │   └── jwtUtils.js           # JWT generation utility
│   └── test/
├── .env
├── app.js
├── package.json
└── README.md
```

## 🔑 API Endpoints

👤 Authentication
Method	Endpoint	Description
POST	/users/signup	Register a new user
POST	/users/login	Login and get JWT token

⚙️ Preferences (Protected)
Method	Endpoint	Description
GET	/users/preferences	Get current user's preferences
PUT	/users/preferences	Update user's preferences

📰 News (Protected)
Method	Endpoint	Description
GET	/news	Get news based on user's preferences


## ⚙️ Switching Between In-Memory and MongoDB

**Why?**  
The API supports both in-memory and persistent databases to help you test quickly or scale to production easily.

**How?**

1. **In-Memory (default for dev/test or if MongoDB not configured):**
    - No external DB needed.
    - User, preferences, and token data reset on server restart.
2. **MongoDB (for production, development, or persistent storage):**
    - Set `NODE_ENV=production` and provide `MONGO_URI` in your `.env`.
    - Data is persistent and suitable for real applications.

**Environment Example (.env):**
```dotenv
NODE_ENV=production                  # Switches to MongoDB, or omit for in-memory
PORT=3000
JWT_SECRET=secretkey
JWT_REFRESH_SECRET=secretrefreshkey
NEWS_API_KEY=newsapi_key
MONGO_URI=mongodb://localhost:27017/newsdb # Only needed for MongoDB mode
```

**No code changes needed**—the correct storage provider is selected automatically.

## 🖼️ Folder Structure

Your project files are organized as shown in the screenshot above.  
- **`models/userProvider.js`**: This file dynamically requires either the Mongoose model (for MongoDB) or the in-memory model (for quick testing).
- **`db/inMemoryDB.js`**: Fast, stateless storage.
- **`models/usersModel.js`**: Mongoose schema for persistent storage.

## ⚡ Advanced/Recent Improvements

- JWT token generation code is now DRY and reusable via `utils/jwtUtils.js`.
- Allowed user roles are managed in `config/constants.js`.
- Emails are normalized to lower-case.
- Modular structure for validators and middlewares for maintainability.
- All providers implement shared methods (`findOne`, `findById`, `save`, etc.) for seamless switching.

## 🛑 Important Notes

- All user data is stored in **memory only** if you are not using MongoDB.  
  Data will reset upon server restart.
- For production or persistent storage, use **MongoDB mode**.
- Ideal for learning, prototyping, and demoing.

Let me know if you need any **endpoint examples**, code snippets, or extra guidance on documenting new features!