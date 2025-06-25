# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "customer", // "customer", "provider", "admin"
  "fullName": "John Doe",
  "phone": "+1234567890",
  // Provider-specific fields (if role is "provider")
  "businessName": "ABC Services",
  "serviceCategory": "Plumbing",
  "address": "123 Main St",
  "location": {
    "coordinates": [-74.006, 40.7128]
  },
  "licenseNumber": "LIC123456",
  "description": "Professional plumbing services"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "customer",
    "fullName": "John Doe"
  }
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
```
*Requires authentication*

### Update Profile
```http
PATCH /auth/profile
```
*Requires authentication*

**Request Body:**
```json
{
  "fullName": "Updated Name",
  "phone": "+1234567890",
  "avatar": "avatar-url"
}
```

## Service Endpoints

### Get All Services
```http
GET /services
```

**Query Parameters:**
- `category` - Filter by category ID
- `status` - Filter by status (active/inactive)
- `provider` - Filter by provider ID

### Get Services by Location
```http
GET /services/nearby
```

**Query Parameters:**
- `longitude` - Longitude coordinate
- `latitude` - Latitude coordinate
- `radius` - Search radius in meters (default: 10000)

### Get Single Service
```http
GET /services/:id
```

### Create Service
```http
POST /services
```
*Requires authentication (Provider only)*

**Request Body:**
```json
{
  "title": "Professional Plumbing",
  "category": "category-id",
  "description": "Expert plumbing services",
  "price": 500,
  "location": {
    "longitude": -74.006,
    "latitude": 40.7128
  },
  "radius": 10000
}
```

### Update Service
```http
PUT /services/:id
```
*Requires authentication (Service owner only)*

### Delete Service
```http
DELETE /services/:id
```
*Requires authentication (Service owner only)*

## Booking Endpoints

### Get User Bookings
```http
GET /bookings
```
*Requires authentication*

### Get All Bookings (Admin)
```http
GET /bookings/all
```
*Requires authentication (Admin only)*

### Get Single Booking
```http
GET /bookings/:id
```
*Requires authentication*

### Create Booking
```http
POST /bookings
```
*Requires authentication*

**Request Body:**
```json
{
  "serviceId": "service-id",
  "providerId": "provider-id",
  "scheduledDate": "2024-03-15",
  "scheduledTime": "10:00 AM",
  "location": {
    "address": "123 Main St, City",
    "coordinates": [-74.006, 40.7128]
  }
}
```

### Update Booking Status
```http
PATCH /bookings/:id/status
```
*Requires authentication*

**Request Body:**
```json
{
  "status": "confirmed" // "pending", "confirmed", "completed", "cancelled"
}
```

### Add Booking Review
```http
POST /bookings/:id/review
```
*Requires authentication (Customer only)*

**Request Body:**
```json
{
  "score": 5,
  "review": "Excellent service!"
}
```

## Category Endpoints

### Get All Categories
```http
GET /categories
```

**Query Parameters:**
- `status` - Filter by status (active/inactive)

### Get Single Category
```http
GET /categories/:id
```

### Create Category
```http
POST /categories
```
*Requires authentication (Admin only)*

**Request Body:**
```json
{
  "name": "Plumbing",
  "description": "Plumbing services",
  "icon": "wrench"
}
```

### Update Category
```http
PUT /categories/:id
```
*Requires authentication (Admin only)*

### Delete Category
```http
DELETE /categories/:id
```
*Requires authentication (Admin only)*

## Report Endpoints

### Get All Reports (Admin)
```http
GET /reports/all
```
*Requires authentication (Admin only)*

### Get User Reports
```http
GET /reports
```
*Requires authentication*

### Get Single Report
```http
GET /reports/:id
```
*Requires authentication*

### Create Report
```http
POST /reports
```
*Requires authentication*

**Request Body:**
```json
{
  "title": "Service Quality Issue",
  "type": "quality", // "quality", "payment", "behavior", "other"
  "description": "Detailed description of the issue",
  "reportedUser": "user-id",
  "booking": "booking-id",
  "priority": "medium" // "low", "medium", "high"
}
```

### Update Report Status
```http
PATCH /reports/:id/status
```
*Requires authentication (Admin only)*

**Request Body:**
```json
{
  "status": "resolved", // "pending", "investigating", "resolved"
  "resolution": "Issue has been resolved"
}
```

## User Management (Admin)

### Get All Users
```http
GET /users
```
*Requires authentication (Admin only)*

**Query Parameters:**
- `role` - Filter by user role
- `status` - Filter by user status
- `page` - Page number for pagination
- `limit` - Number of users per page

### Get Single User
```http
GET /users/:id
```
*Requires authentication (Admin only)*

### Update User Status
```http
PATCH /users/:id/status
```
*Requires authentication (Admin only)*

**Request Body:**
```json
{
  "status": "active" // "active", "inactive", "suspended"
}
```

## Media Upload

### Upload Media File
```http
POST /media/upload/:folder
```
*Requires authentication*

**Request:**
- Content-Type: multipart/form-data
- Body: Form data with 'file' field

**Parameters:**
- `folder` - Upload folder (users, services, categories)

**Response:**
```json
{
  "message": "File uploaded successfully",
  "url": "media/users/filename.jpg"
}
```

### Delete Media File
```http
DELETE /media/:folder/:filename
```
*Requires authentication (Admin only)*

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- Upload endpoints: 10 requests per minute

## Pagination

For endpoints that return lists, pagination is supported:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response:**
```json
{
  "data": [],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## WebSocket Events

### Connection
```javascript
const socket = io('http://localhost:5000', {
  query: { userId: 'user-id', bookingId: 'booking-id' }
});
```

### Events

#### Send Message
```javascript
socket.emit('message', {
  bookingId: 'booking-id',
  message: {
    senderId: 'user-id',
    text: 'Hello!',
    timestamp: new Date()
  }
});
```

#### Receive Message
```javascript
socket.on('message', (message) => {
  console.log('New message:', message);
});
```

#### Typing Indicator
```javascript
// Send typing
socket.emit('typing', {
  bookingId: 'booking-id',
  userId: 'user-id'
});

// Receive typing
socket.on('typing', (userId) => {
  console.log(`${userId} is typing...`);
});
```

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Get services
const services = await api.get('/services');

// Create booking
const booking = await api.post('/bookings', {
  serviceId: 'service-id',
  scheduledDate: '2024-03-15'
});
```

### cURL Examples
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get services
curl -X GET http://localhost:5000/api/services \
  -H "Authorization: Bearer your-jwt-token"

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"service-id","scheduledDate":"2024-03-15"}'
```

---

For more examples and detailed integration guides, see the [Integration Examples](./INTEGRATION.md) documentation.