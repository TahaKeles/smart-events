# Smart Events

## A Real-Time Event Discovery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Smart Events is a full-stack application that helps users discover cultural, social, and professional events in real-time, tailored to their interests and location.

## ✨ Features

- **User Authentication**: Secure signup, login, and profile management
- **Event Discovery**: Browse events with advanced filtering options
- **Geolocation Services**: Find events near your current location
- **Personalized Recommendations**: Event suggestions based on your interests
- **RSVP Management**: Join events and track your attendance
- **User Profiles**: Customize your profile with interests and preferences
- **Responsive Design**: Seamless experience across desktop and mobile devices

## 🛠 Tech Stack

### Frontend

- **React.js**: UI library for building the user interface
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests
- **CSS-in-JS**: Styling solution for components

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM library for MongoDB
- **JWT**: Authentication mechanism
- **GeoJSON**: Geospatial data format

## 📂 Project Structure

```
smart-events/
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   └── src/                # React source code
│       ├── components/     # Reusable React components
│       ├── pages/          # Page components
│       ├── styles/         # CSS files
│       └── App.jsx         # Main application component
└── backend/                # Express.js backend API
    ├── controllers/        # Route handlers
    ├── models/             # MongoDB models
    ├── routes/             # API route definitions
    ├── seed/               # Database seed scripts
    └── index.js            # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14+)
- npm or Yarn
- A MongoDB database connection (e.g., MongoDB Atlas free cluster)

### Backend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/TahaKeles/smart-events.git
   cd smart-events
   ```

2. Backend Setup

   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. Backend Environment Variables

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server
   ```bash
   cd backend
   npm run dev
   ```

### Frontend Setup

1. Install dependencies

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

2. Start the frontend server
   ```bash
   cd ../frontend
   npm start
   ```

### Environment Variables

Edit `.env` with your API URL:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Run the application

Start backend server:

```bash
cd backend
npm start
```

## 🧪 Testing

1. **Unit/Integration Tests**: Write tests using frameworks like Jest or Mocha + Chai for your backend.
2. **Manual Testing**: Use Postman or cURL to send requests to:
   - POST http://localhost:5000/api/auth/register
   - POST http://localhost:5000/api/auth/login
   - GET http://localhost:5000/api/events
   - etc.
3. **Frontend**: Validate forms, login flows, and event discovery in the browser.

## 🔍 Enhancements

- **Geospatial Queries**: Use MongoDB's $near or $geoWithin to filter events by user location.
- **Advanced Recommendation**: Implement a scoring algorithm that factors in user's interest match, event popularity, or distance weighting.
- **Pagination**: Add pagination for large event lists.
- **Security**: Use HTTPS, secure cookies, and improve JWT handling (refresh tokens, short expiration, etc.).

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push to your fork and create a pull request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
