# Authentication API Documentation

This document describes the authentication endpoints implemented in this Next.js application.

## Base URL
```
http://localhost:3000/api/auth
```

## Endpoints

### 1. User Registration
**POST** `/api/auth/register`

Register a new user account.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "Your Name"
}
```

#### Response (Success - 201)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "abc123456",
    "email": "user@example.com",
    "name": "Your Name",
    "createdAt": "2025-01-10T12:00:00Z"
  }
}
```

#### Response (Error - 400/409)
```json
{
  "error": "Error message here"
}
```
lmao
### 2. User Login
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Response (Success - 200)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "abc123456",
    "email": "user@example.com",
    "name": "Your Name",
    "createdAt": "2025-01-10T12:00:00Z"
  }
}
```

#### Response (Error - 401)
```json
{
  "error": "Invalid email or password"
}
```

### 3. Get User Profile (Protected)
**GET** `/api/auth/profile`

Get the current user's profile information. Requires authentication.

#### Headers
```
Authorization: Bearer your_jwt_token_here
```

#### Response (Success - 200)
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "abc123456",
    "email": "user@example.com",
    "name": "Your Name",
    "createdAt": "2025-01-10T12:00:00Z"
  }
}
```

#### Response (Error - 401)
```json
{
  "error": "Missing or invalid authorization header"
}
```

## Usage Examples

### Using curl

#### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Get profile (replace TOKEN with actual JWT):
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using JavaScript/TypeScript

#### Register:
```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  }),
});

const data = await response.json();
```

#### Login:
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  }),
});

const data = await response.json();
// Store the token for future requests
localStorage.setItem('token', data.token);
```

#### Get Profile:
```typescript
const token = localStorage.getItem('token');
const response = await fetch('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const data = await response.json();
```

## Validation Rules

### Email
- Must be a valid email format
- Required field

### Password
- Minimum 6 characters
- Required field

### Name
- Required field for registration
- No minimum length requirement

## Security Notes

1. **JWT Secret**: In production, set a strong JWT secret in environment variables
2. **HTTPS**: Always use HTTPS in production
3. **Password Storage**: Passwords are hashed using bcrypt with 12 salt rounds
4. **Token Expiration**: JWT tokens expire after 24 hours
5. **Database**: This implementation uses in-memory storage for demo purposes. In production, use a proper database.

## Error Codes

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Invalid credentials or token
- **409**: Conflict - User already exists
- **500**: Internal Server Error - Server-side error 
