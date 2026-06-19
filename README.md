# 🎫 Eventick - Events & Ticket Booking Platform

A modern, full-stack event booking platform with advanced authentication, real-time features, and premium UI/UX.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-61dafb)

---

## 🌟 Features

### **Core Functionality**
- 🎭 **Multi-Domain Booking** - Events, Sports Matches, Movies
- 🔐 **Advanced Authentication** - OTP, Password, Google Sign-In
- 💳 **Secure Booking Flow** - Multi-step ticket purchase
- 🔍 **Smart Search & Filters** - Category, city, price, date
- 📧 **Email Notifications** - OTP, welcome, booking confirmations
- ⚡ **Real-time Updates** - WebSocket seat locking & availability
- 🎨 **Premium Dark UI** - Glassmorphism, smooth animations
- 📱 **Fully Responsive** - Mobile, tablet, desktop optimized

### **Authentication System**
- **OTP-based Sign-up** - Email verification with 6-digit code
- **Password Login** - Secure bcrypt hashing
- **Google OAuth** - One-click social login (ready)
- **Protected Routes** - Event details & booking require login
- **JWT Tokens** - Secure session management
- **Rate Limiting** - Prevents abuse (3 OTP/15min, 5 login/15min)

### **Real-time Features**
- **Seat Locking** - 5-minute reservation timeout
- **Live Availability** - Instant seat count updates
- **Admin Notifications** - Real-time booking alerts

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Firebase Admin SDK** - Authentication & OTP
- **Nodemailer** - Email service (Gmail SMTP)
- **Socket.io** - WebSocket server
- **JWT** - Token-based auth
- **bcrypt** - Password hashing

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js >= 16.0.0
- MongoDB Atlas account
- Firebase project
- Gmail account (for emails)

### **1. Clone Repository**
```bash
git clone <your-repo-url>
cd "Event Management and Ticket Booking Website"
```

### **2. Backend Setup**

```bash
cd eventick-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventickDB
JWT_SECRET=your-secret-key
FIREBASE_ADMIN_SDK_PATH=./firebase-admin.json
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Eventick <your-email@gmail.com>
```

**Add Firebase credentials:**
- Download `firebase-admin.json` from Firebase Console
- Place in `eventick-backend/` folder

**Start backend:**
```bash
npm run dev
```

Backend runs on: **http://localhost:5000**

### **3. Frontend Setup**

```bash
cd eventick-react

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

**Edit `.env.local` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_WEBSOCKET_URL=http://localhost:5000
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-key
```

**Start frontend:**
```bash
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📁 Project Structure

```
Event Management and Ticket Booking Website/
├── eventick-backend/          # Node.js backend
│   ├── src/
│   │   ├── config/           # Database, Firebase, email config
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth, validation, rate limiting
│   │   ├── services/         # Firebase, email services
│   │   └── server.js         # Entry point
│   ├── firebase-admin.json   # Firebase credentials (add manually)
│   └── .env                  # Environment variables
│
└── eventick-react/           # React frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── auth/        # Auth modal, protected routes
    │   │   ├── common/      # Navbar, footer, buttons
    │   │   ├── home/        # Homepage sections
    │   │   └── events/      # Event components
    │   ├── pages/           # Route pages
    │   ├── context/         # Auth & theme context
    │   ├── services/        # API service layer
    │   └── App.jsx          # Main app component
    └── .env.local           # Environment variables
```

---

## 🔐 Authentication Flow

### **New User Sign-up (OTP)**
1. User clicks "Sign In" → Modal opens
2. Clicks "Login with OTP instead"
3. Enters email → Receives OTP via email
4. Enters OTP + name → Verification
5. Sets password → Account created ✅

### **Returning User Login**
1. User clicks "Sign In"
2. Enters email + password
3. Logged in ✅

### **Protected Routes**
- `/events/:id` - Event details
- `/sports/:id` - Sports match details
- `/movies/:id` - Movie details
- `/booking/:id` - Ticket booking

**Behavior:** Unauthenticated users redirected to login modal

---

## 🎨 Design System

### **Color Palette**
- **Primary Purple**: `#a855f7`
- **Accent Pink**: `#ec4899`
- **Accent Amber**: `#f59e0b`
- **Dark Background**: `#0a0a0a`
- **Card Background**: `#1a1a1a`

### **Responsive Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Typography Scale**
- **Headings**: 24px - 72px (responsive)
- **Body**: 14px - 18px
- **Labels**: 12px - 16px

---

## 🔌 API Endpoints

### **Authentication** (`/api/auth`)
```
POST   /send-otp           - Send OTP to email
POST   /verify-otp         - Verify OTP code
POST   /set-password       - Set password after OTP
POST   /login              - Password login
POST   /google             - Google Sign-In
GET    /me                 - Get current user (Protected)
POST   /logout             - Logout (Protected)
PUT    /update-profile     - Update profile (Protected)
```

### **Events** (`/api/events`)
```
GET    /                   - Get all events
GET    /:id                - Get single event
POST   /                   - Create event (Admin)
PUT    /:id                - Update event (Admin)
DELETE /:id                - Delete event (Admin)
```

### **Sports** (`/api/sports`)
```
GET    /                   - Get all matches
GET    /:id                - Get single match
POST   /                   - Create match (Admin)
```

### **Movies** (`/api/movies`)
```
GET    /                   - Get all movies
GET    /:id                - Get single movie
POST   /                   - Add movie (Admin)
```

### **Bookings** (`/api/bookings`)
```
POST   /                   - Create booking (Protected)
GET    /user/:userId       - Get user bookings (Protected)
GET    /:id                - Get booking details (Protected)
```

---

## 🧪 Testing

### **Backend**
```bash
cd eventick-backend
npm test
```

### **Frontend**
```bash
cd eventick-react
npm test
```

### **Manual Testing Flow**
1. Start both servers
2. Open http://localhost:5173
3. Browse events (no login)
4. Click event details → Login required
5. Sign up with OTP
6. Complete booking flow

---

## 📧 Email Configuration

### **Gmail Setup**
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → App Passwords
   - Select "Mail" and "Other"
   - Copy 16-character password
3. Add to `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

### **Email Templates**
- **OTP Email** - 6-digit verification code
- **Welcome Email** - Account creation confirmation
- **Booking Confirmation** - Ticket details & QR code

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based sessions
- **bcrypt Hashing** - Password encryption (10 rounds)
- **Rate Limiting** - Prevents brute force attacks
- **Input Validation** - Sanitizes all user inputs
- **CORS Protection** - Configured allowed origins
- **Helmet.js** - Security headers
- **Environment Variables** - Sensitive data protection

---

## 📱 Responsive Design

### **Mobile-First Approach**
- Base styles for phones (< 640px)
- Enhanced layouts for tablets (640px - 1024px)
- Premium experience for desktops (> 1024px)

### **Touch-Friendly**
- Minimum 44px touch targets
- Larger buttons on mobile
- Swipe-friendly carousels

### **Adaptive Layouts**
- 1-column on mobile
- 2-column on tablets
- 3-4 column on desktop

---

## 🚀 Deployment

### **Backend (Render/Railway)**
```bash
# Build command
npm install

# Start command
npm start

# Environment variables
Add all .env variables in dashboard
```

### **Frontend (Vercel/Netlify)**
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
VITE_API_URL=https://your-backend-url.com/api
VITE_WEBSOCKET_URL=https://your-backend-url.com
```

---

## 📝 Environment Variables

### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
TEMP_TOKEN_EXPIRE=15m
FIREBASE_ADMIN_SDK_PATH=./firebase-admin.json
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Eventick <your-email@gmail.com>
WEBSOCKET_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### **Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_WEBSOCKET_URL=http://localhost:5000
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-key
```

---

## 🎯 Future Enhancements

- [ ] Payment Gateway Integration (Stripe/Razorpay)
- [ ] QR Code Ticket Generation
- [ ] Email Verification on Signup
- [ ] Password Reset Flow
- [ ] User Dashboard & Profile Page
- [ ] Booking History
- [ ] Admin Panel
- [ ] Analytics Dashboard
- [ ] Push Notifications
- [ ] Multi-language Support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@TechByAnshuu](https://github.com/TechByAnshuu)
- Email: anshm0641@gmail.com

---

## 🙏 Acknowledgments

- Firebase for authentication infrastructure
- MongoDB Atlas for cloud database
- Unsplash for event images
- Tailwind CSS for styling system
- Framer Motion for animations

---

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

**Made with ❤️ using React, Node.js, and MongoDB**
