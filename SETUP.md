# Setup Guide for MongoDB Integration

## Prerequisites

1. **MongoDB**: Make sure MongoDB is installed and running on your system
2. **Node.js**: Version 16 or higher

## Installation Steps

### 1. Install Dependencies
The required dependencies have already been installed:
- `mongodb` - MongoDB driver
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `next-auth` - Authentication framework

### 2. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/aadxcelit
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or if using MongoDB Compass, make sure the service is running
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or if installed via Homebrew
brew services start mongodb-community
```

### 4. Run the Application
```bash
yarn dev
```

## Features Implemented

### Authentication System
- **Registration**: Admin can register (first user becomes admin)
- **Login**: JWT-based authentication
- **Protected Routes**: Dashboard access requires admin privileges

### Admin Dashboard
- **Blog Management**: Create, read, update, delete blog posts
- **Team Management**: Add, edit, remove team members
- **Website Settings**: Update logos, contact info, social links

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/[id]` - Update blog (admin only)
- `DELETE /api/blogs/[id]` - Delete blog (admin only)
- `GET /api/team` - Get all team members
- `POST /api/team` - Add team member (admin only)
- `PUT /api/team/[id]` - Update team member (admin only)
- `DELETE /api/team/[id]` - Delete team member (admin only)
- `GET /api/settings` - Get website settings
- `PUT /api/settings` - Update website settings (admin only)

## Usage

### 1. First Time Setup
1. Start the application
2. Navigate to `/auth`
3. Click "Create Account" to register the first admin user
4. Login with your credentials
5. Access the dashboard at `/dashboard`

### 2. Managing Content
- **Blogs**: Create, edit, and publish blog posts
- **Team**: Add team members with photos, bios, and social links
- **Settings**: Update website branding and contact information

### 3. Security Features
- JWT tokens with 7-day expiration
- Password hashing with bcrypt
- Role-based access control (admin/user)
- Protected API endpoints

## Database Models

### User
- username, email, password, role, timestamps

### Blog
- title, content, excerpt, author, image, tags, published, timestamps

### Team
- name, position, bio, image, email, social links, order, active, timestamps

### Settings
- logos, site info, contact details, social media links

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running
2. Check the connection string in `.env.local`
3. Verify MongoDB port (default: 27017)

### Authentication Issues
1. Clear browser localStorage
2. Check JWT_SECRET in environment variables
3. Verify user role in database

### API Errors
1. Check browser console for error messages
2. Verify JWT token in Authorization header
3. Ensure user has admin privileges for protected endpoints

## Production Considerations

1. **Change JWT_SECRET** to a strong, unique key
2. **Use environment-specific MongoDB URIs**
3. **Implement rate limiting** for API endpoints
4. **Add input validation** and sanitization
5. **Set up proper CORS** configuration
6. **Use HTTPS** in production
7. **Implement logging** and monitoring
8. **Set up backup** strategies for MongoDB

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── blogs/
│   │   ├── team/
│   │   └── settings/
│   ├── auth/
│   │   └── page.tsx
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── DashboardSidebar.tsx
│   │   ├── BlogManagement.tsx
│   │   ├── TeamManagement.tsx
│   │   └── SettingsManagement.tsx
│   └── Navbar.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── auth.ts
│   └── mongodb.ts
└── models/
    ├── User.ts
    ├── Blog.ts
    ├── Team.ts
    └── Settings.ts
```
