# Eventick Backend API

Backend server for Eventick ticket booking platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB Atlas credentials

# Run development server
npm run dev

# Run production server
npm start
```

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Security**: Helmet, CORS, bcrypt

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
POST   /api/auth/logout      - Logout user (Protected)
PUT    /api/auth/update-profile - Update profile (Protected)
```

### Events
```
GET    /api/events           - Get all events
GET    /api/events/:id       - Get single event
POST   /api/events           - Create event (Admin)
PUT    /api/events/:id       - Update event (Admin)
DELETE /api/events/:id       - Delete event (Admin)
```

### Sports
```
GET    /api/sports           - Get all matches
GET    /api/sports/:id       - Get single match
POST   /api/sports           - Create match (Admin)
```

### Movies
```
GET    /api/movies           - Get all movies
GET    /api/movies/:id       - Get single movie
POST   /api/movies           - Add movie (Admin)
```

### Bookings
```
POST   /api/bookings         - Create booking (Protected)
GET    /api/bookings/user/:userId - Get user bookings (Protected)
GET    /api/bookings/:id     - Get booking details (Protected)
```

## 🔐 Environment Variables

See `.env.example` for required environment variables.

## 📝 License

MIT
