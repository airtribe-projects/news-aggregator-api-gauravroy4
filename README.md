📰 News Aggregator API

A simple RESTful API built with Node.js and Express.js for:

User Registration & Authentication (JWT based)
User News Preferences Management
News Fetching from External API (based on user preferences)
In-Memory Data Storage (No database used)

🚀 Features
✅ User Signup & Login with JWT
✅ Password Hashing with bcrypt
✅ Protected Routes with JWT Middleware
✅ User Preferences (Categories & Language)
✅ External News Fetching (via News API service)
✅ Input Validation & Error Handling


🛠️ Tech Stack
Node.js
Express.js
bcryptjs
jsonwebtoken
dotenv
axios (for external news fetching)

📁 Project Root
├── 📂 config
│   └── config.js                # Environment variables loader
├── 📂 models
│   └── usersModel.js            # In-memory User model
├── 📂 controllers
│   ├── authController.js        # Handles user registration & login
│   ├── preferencesController.js # Handles user preferences (get/update)
│   └── newsController.js        # Handles fetching news based on preferences
├── 📂 middlewares
│   ├── authMiddleware.js        # JWT authentication middleware
│   ├── requestLogger.js         # Logs incoming requests - Oprional to use while development
│   └── 📂 validators             # Input validation middlewares
├── 📂 routes
│   ├── authRoutes.js            # Routes for user auth (signup/login)
│   ├── preferencesRoutes.js     # Routes for user preferences (get/update)
│   └── newsRoutes.js            # Routes for fetching news
├── 📂 services
│   └── newsService.js           # External news API integration logic
├── 📂 test
│   └── server.test.js           # Test cases (auth, preferences, news)
├── .env                         # Environment variables
├── app.js                       # Express app setup
├── package.json                  # Project metadata and dependencies
└── README.md                     # Project documentation


🔑 API Endpoints

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

🔒 Authentication
Pass JWT token as:

Authorization: Bearer <token>

Or as Cookie token=<token>

📝 Sample .env
PORT=3000
JWT_SECRET=secretkey
JWT_REFRESH_SECRET=secretrefreshkey
NEWS_API_KEY=newsapi_key

🧪 Run Tests
bash
npm install
npm test

🏁 Start the Server
npm install
node app.js

📥 Sample User Payload
{
  "name": "Clark Kent",
  "email": "clark@superman.com",
  "password": "Krypt()n8",
  "preferences": ["movies", "comics"]
}

🛑 Important Notes
All user data is stored in-memory. Data will reset on server restart.

Ideal for testing, POCs, or demo purposes.

Production apps should use a persistent database like MongoDB or PostgreSQL.

