# Eventick - Event Management & Ticket Booking Platform

A modern, premium event booking platform built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Dark UI** with glassmorphism effects and smooth animations
- **Full Event System** with search, filters, and categories
- **Multi-Step Booking Flow** with ticket selection and form validation
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Dark/Light Mode** with theme persistence
- **Premium Aesthetics** matching modern event booking platforms

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router v6** - Routing
- **React Hook Form** - Form handling
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The app is **fully responsive** and optimized for all devices:

- **Mobile First**: Base styles for phones (< 640px)
- **Tablet**: Optimized layouts for 640px-1024px
- **Desktop**: Enhanced experience for 1024px+
- **Touch-Friendly**: Minimum 44px touch targets
- **Adaptive Grids**: 1-2-3-4 column layouts based on screen size
- **Responsive Typography**: Scales from 12px to 72px
- **Mobile Navigation**: Slide-in hamburger menu
- **Flexible Cards**: adaptive padding and sizing
- **Breakpoint System**: sm (640px), md (768px), lg (1024px), xl (1280px)

See [RESPONSIVE.md](./RESPONSIVE.md) for detailed responsive design documentation.

## 🎨 Design Features

- **Animated Gradient Backgrounds**
- **Glassmorphism Cards**
- **Smooth Page Transitions**
- **Micro-interactions** on buttons and cards
- **Custom Scrollbar** styling
- **Loading Skeletons**
- **Status Badges** (Selling Fast, Few Seats Left)
- **Wishlist Functionality**

## 📱 Pages

- **Home** - Hero with search, services, featured events, venues
- **Events** - Browse with filters (category, city, price, sort)
- **Event Details** - Comprehensive event information
- **Booking** - Multi-step booking process
- **Venues** - Premium venue showcase

## 🔧 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Button, Card, Navbar, Footer)
│   ├── home/            # Home page sections
│   └── events/          # Event-related components
├── pages/               # Route pages
├── services/            # API/data services (mock data for now)
├── context/             # React contexts (Theme)
├── utils/               # Constants and utilities
└── styles/              # Global CSS

```

## 🎯 Next Steps

1. **Copy Images**: Move images from parent folder to `public/images/`
2. **Backend Integration**: Replace mock data with real API calls
3. **Payment Gateway**: Integrate payment processing
4. **Authentication**: Add user login/signup
5. **Email Notifications**: Send booking confirmations
6. **Testing**: Add unit and integration tests

## 🌟 Features Ready for Backend

The app is designed to easily integrate with a backend:
- Event service has mock data that can be swapped with API calls
- All filters and search parameters are ready
- Booking flow captures all necessary data
- Form validation is complete

## 📝 Notes

- Images are referenced from `/images/` folder - ensure images are copied there
- Mock data includes 10 sample events
- Theme preference is saved in localStorage
- Fully responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

## 🎨 Color Palette

- **Primary Purple**: #a855f7
- **Accent Pink**: #ec4899
- **Accent Amber**: #f59e0b
- **Dark Background**: #0a0a0a
- **Card Background**: #1a1a1a

## 📄 License

This project is created for educational/portfolio purposes.
