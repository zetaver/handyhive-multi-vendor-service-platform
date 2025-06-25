# Screenshots Directory

This directory contains all the screenshots used in the project documentation.

## Screenshot Guidelines

### Naming Convention
- Use descriptive, kebab-case names
- Include the feature/page name
- Add device type for mobile screenshots
- Example: `customer-dashboard.png`, `mobile-navigation.png`

### Image Requirements
- **Format**: PNG preferred for UI screenshots
- **Resolution**: 
  - Desktop: 1920x1080 or 1440x900
  - Mobile: 375x812 (iPhone X) or 360x640 (Android)
  - Tablet: 768x1024 (iPad)
- **Quality**: High quality, clear and readable text
- **File Size**: Optimize for web (< 500KB per image)

### Screenshot Categories

#### Landing Page
- `landing-page.png` - Full landing page
- `landing-hero.png` - Hero section
- `landing-features.png` - Features section
- `landing-services.png` - Services showcase

#### Authentication
- `login.png` - Login page
- `signup-customer.png` - Customer signup
- `signup-provider.png` - Provider signup
- `signup-mobile.png` - Mobile signup form

#### Customer Interface
- `customer-dashboard.png` - Main dashboard
- `service-categories.png` - Service category grid
- `service-search.png` - Search functionality
- `service-details.png` - Service detail page
- `booking-flow.png` - Booking process
- `active-requests.png` - Active service requests
- `booking-history.png` - Booking history

#### Provider Interface
- `provider-dashboard.png` - Provider overview
- `provider-services.png` - Service management
- `provider-bookings.png` - Booking management
- `provider-earnings.png` - Earnings dashboard
- `provider-reviews.png` - Reviews management

#### Admin Interface
- `admin-dashboard.png` - Admin overview
- `user-management.png` - User management
- `service-management.png` - Service oversight
- `analytics.png` - Analytics dashboard
- `reports-management.png` - Reports handling

#### Communication
- `chat-interface.png` - Real-time chat
- `notifications.png` - Notification center
- `messaging-mobile.png` - Mobile messaging

#### Mobile Views
- `mobile-dashboard.png` - Mobile dashboard
- `mobile-navigation.png` - Mobile menu
- `mobile-booking.png` - Mobile booking flow
- `mobile-chat.png` - Mobile chat interface

#### Features
- `google-maps-integration.png` - Maps functionality
- `location-search.png` - Location autocomplete
- `rating-system.png` - Rating and reviews
- `payment-flow.png` - Payment process

### Taking Screenshots

#### Desktop Screenshots
1. Use a clean browser window (Chrome recommended)
2. Set browser zoom to 100%
3. Clear browser cache and cookies
4. Use incognito/private mode for consistency
5. Ensure proper lighting and contrast

#### Mobile Screenshots
1. Use browser developer tools device simulation
2. Test on actual devices when possible
3. Capture both portrait and landscape orientations
4. Include device frame for context

#### Tools Recommended
- **macOS**: Screenshot (Cmd+Shift+4)
- **Windows**: Snipping Tool or Snip & Sketch
- **Browser**: Full page screenshot extensions
- **Mobile**: Device screenshots or browser dev tools

### Image Optimization

Before adding screenshots:

1. **Resize** images to appropriate dimensions
2. **Compress** using tools like:
   - TinyPNG (online)
   - ImageOptim (macOS)
   - GIMP (cross-platform)
3. **Rename** following the naming convention
4. **Verify** image quality and readability

### Usage in Documentation

Reference screenshots in markdown:
```markdown
![Description](./screenshots/filename.png)
*Caption describing the screenshot*
```

For responsive documentation:
```markdown
<img src="./screenshots/filename.png" alt="Description" width="600">
```

### Updating Screenshots

When updating the UI:
1. Take new screenshots following these guidelines
2. Replace old screenshots with same filename
3. Update documentation if layout changes significantly
4. Verify all documentation links still work

### File Organization

```
screenshots/
├── auth/
│   ├── login.png
│   ├── signup-customer.png
│   └── signup-provider.png
├── customer/
│   ├── dashboard.png
│   ├── booking-flow.png
│   └── service-search.png
├── provider/
│   ├── dashboard.png
│   ├── services.png
│   └── earnings.png
├── admin/
│   ├── dashboard.png
│   ├── users.png
│   └── analytics.png
├── mobile/
│   ├── dashboard.png
│   ├── navigation.png
│   └── booking.png
└── features/
    ├── chat.png
    ├── maps.png
    └── notifications.png
```

---

**Note**: Screenshots should be updated regularly to reflect the current state of the application. Outdated screenshots can confuse users and should be replaced promptly.