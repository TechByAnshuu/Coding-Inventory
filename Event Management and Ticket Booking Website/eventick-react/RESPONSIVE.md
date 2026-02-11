# Responsive Design Guide

## Breakpoints

The application uses Tailwind CSS breakpoints:
- **Mobile (default)**: < 640px
- **sm (small)**: ≥ 640px (tablets portrait)
- **md (medium)**: ≥ 768px (tablets landscape)
- **lg (large)**: ≥ 1024px (desktops)
- **xl (extra large)**: ≥ 1280px (large desktops)

## Responsive Features Implemented

### ✅ Hero Section
- **Text Sizes**: 
  - Title: `text-4xl` → `sm:text-5xl` →`md:text-6xl` → `lg:text-7xl`
  - Subtitle: `text-lg` → `sm:text-xl` → `md:text-2xl`
- **Spacing**: Responsive padding and margins
- **Search Bar**: Stack vertically on mobile, horizontal on md+
- **Input Sizes**: Smaller on mobile (`text-sm py-3`) larger on desktop
- **Category Pills**: Wrapping flex layout
- **Stats**: 3-column grid with responsive text sizes

### ✅ Navigation
- **Navbar**: 
  - hamburger menu on mobile (< md)
  - Full navigation on desktop (≥ md)
  - Slide-in mobile menu with animations
- **Logo**: Responsive sizing on small screens

### ✅ Services Grid
- **Grid Layout**: 
  - 2 columns on mobile (`grid-cols-2`)
  - 4 columns on large screens (`lg:grid-cols-4`)
- **Card Padding**: `p-4` on mobile → `sm:p-6` on larger screens
- **Icon Sizes**: `w-12 h-12` → `sm:w-14 sm:h-14`
- **Text Sizes**: Scaled down on mobile with `text-xs sm:text-sm`

### ✅ Event Cards
- **Grid Layouts**:
  - 1 column on mobile
  - 2 columns on md (`md:grid-cols-2`)
  - 3 columns on lg (`lg:grid-cols-3`)
- **Image Heights**: Responsive aspect ratios
- **Button Sizes**: Touch-friendly (min 44px height)
- **Gap Spacing**: `gap-4` → `sm:gap-6`

### ✅ Event Details Page
- **Hero Image**: 
  - `h-64` (mobile) → `sm:h-80` → `md:h-96` → `lg:h-[500px]`
- **Grid Layout**: 
  - 1 column on mobile
  - 2/3 split on large (`lg:grid-cols-3`)
- **Sticky Sidebar**: Only on desktop (lg+)
- **Title**: `text-3xl` → `sm:text-4xl` → `md:text-5xl`

### ✅ Booking Page
- **Multi-Step Layout**:
  - Vertical form on mobile
  - Sidebar layout on large screens (`lg:grid-cols-3`)
- **Step Indicators**: 
  - Icons only on mobile
  - Labels visible on sm+
- **Buttons**: Full width on mobile, sized on desktop
- **Form Inputs**: Touch-friendly sizing (min 48px height)

### ✅ Events Listing
- **Filter Sidebar**:
  - Fixed full-screen modal on mobile
  - Sticky sidebar on desktop (`md:sticky`)
- **Search Bar**: Full width, responsive padding
- **Sort Dropdown**: Stack below search on mobile

### ✅ Footer
- **Multi-Column Layout**:
  - 1 column on mobile (`grid-cols-1`)
  - 2 columns on md (`md:grid-cols-2`)
  - 5 columns on lg (`lg:grid-cols-5`)
- **Newsletter**: Stack form elements on mobile
- **Social Icons**: Responsive sizing
- **Cities Pills**: Wrapping flex layout

## Touch-Friendly Design

All interactive elements meet minimum touch target size:
- **Buttons**: Minimum 44x44px
- **Form Inputs**: Minimum 48px height
- **Icon Buttons**: Minimum 40x40px
- **Tap Areas**: Adequate padding around clickable elements

## Typography Scale

### Mobile
- Headings: 24-40px
- Body: 14-16px
- Labels: 12-14px

### Desktop
- Headings: 32-72px
- Body: 16-18px
- Labels: 14-16px

## Spacing System

- **Section Padding**: 
  - Mobile: `py-16 px-4`
  - Desktop: `py-20 px-8`
- **Card Padding**:
  - Mobile: `p-4`
  - Desktop: `p-6` to `p-8`
- **Grid Gap**:
  - Mobile: `gap-4`
  - Desktop: `gap-6` to `gap-8`

## Images

- **Object Fit**: `object-cover` for consistent aspect ratios
- **Lazy Loading**: Browser native lazy loading
- **Fallback**: Placeholder URLs for missing images
- **Responsive Heights**: Different heights for mobile vs desktop

## Forms

- **Input Fields**:
  - Mobile: `py-3 text-sm`
  - Desktop: `py-4 text-base`
- **Icons**: Positioned with responsive left padding
- **Labels**: Responsive font sizes
- **Error Messages**: Visible below fields, responsive text size

## Modals & Overlays

- **Mobile Menu**: Full-screen with slide animation
- **Filter Drawer**: Full-screen on mobile, sidebar on desktop
- **Modals**: Centered with responsive padding

## Performance Optimizations

- **Mobile-First**: Base styles for mobile, enhanced for larger screens
- **Touch Optimized**: Larger tap targets on small screens
- **Reduced Motion**: Disabled animations on smaller screens (optional)
- **Image Optimization**: Smaller images served on mobile

## Testing Checklist

Test on these viewport sizes:
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13)
- [ ] 428px (iPhone 14 Pro Max)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape/Small Desktop)
- [ ] 1280px (Desktop)
- [ ] 1920px (Large Desktop)

## Common Responsive Patterns Used

1. **Stack to Horizontal**: `flex-col md:flex-row`
2. **Hide/Show**: `hidden md:block` or `md:hidden`
3. **Grid Columns**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
4. **Text Sizes**: `text-sm sm:text-base md:text-lg`
5. **Spacing**: `p-4 sm:p-6 md:p-8`
6. **Widths**: `w-full lg:w-1/2`
7. **Gaps**: `gap-4 sm:gap-6 lg:gap-8`

## Accessibility Notes

- Font sizes never go below 14px (0.875rem)
- Color contrast meets WCAG AA standards
- Touch targets meet 44x44px minimum
- Keyboard navigation works at all screen sizes
- Focus states visible at all breakpoints

## Additional Enhancements Made

✅ Smaller icons on mobile
✅ Reduced padding on small screens
✅ Stacked layouts for narrow viewports
✅ Touch-friendly button sizes
✅ Responsive image heights
✅ Flexible grid systems
✅ Mobile-optimized search bars
✅ Collapsible filter sidebars
✅ Responsive modals and drawers
✅ Scaled typography throughout

The application is now fully responsive and provides an optimized experience across all device sizes!
