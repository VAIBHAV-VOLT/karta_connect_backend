# Karta Connect Backend

Standalone Node.js Express backend API for the Karta Connect portal.

## Project Structure

```
karta_connect_backend/
├── server.js              # Main Express application
├── package.json           # Project dependencies
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Example environment configuration
├── .gitignore             # Git ignore rules
├── database/
│   ├── schema.sql         # Database schema
│   └── seed-test.cjs      # Database seeding script
├── test/
│   └── test-anon-select.cjs
├── supabase/
│   └── config.toml        # Supabase configuration
├── uploads/
│   └── resumes/           # Resume storage directory (auto-created)
└── README.md              # This file
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `PORT` - Server port (default: 3001)

### 3. Setup Database
Run the database schema:
```bash
# Use Supabase SQL editor or connect via CLI:
psql postgresql://[user]:[password]@[host]:[port]/[database] -f database/schema.sql
```

### 4. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on http://localhost:3001 (or your configured PORT)

## API Endpoints

### Authentication
- `POST /api/auth/resolve-login` - Check user type and password status
- `POST /api/auth/signup` - Create new user account

### Account Management
- `POST /api/account/delete` - Delete own account (authenticated)

### Admin Routes
- `POST /api/admin/delete-student` - Delete student account (admin only)
- `POST /api/admin/bulk-upload-whitelist` - Bulk upload whitelisted students (admin only)

### Company Routes
- `GET /api/company/:companyId` - Get company data (company owner only)
- `GET /api/company/:companyId/posts` - Get company job posts (company owner only)
- `PUT /api/job-posts/:postId` - Update job post (company owner only)
- `DELETE /api/job-posts/:postId` - Delete job post (company owner only)

### Student Routes
- `GET /api/student/profile` - Get student profile (authenticated student)
- `PUT /api/student/profile` - Update student profile (authenticated student)
- `GET /api/student/applications` - Get student applications (authenticated student)
- `POST /api/student/applications` - Submit job application (authenticated student)

### Health Check
- `GET /health` - Server health check

## Key Changes from Monorepo

1. **Environment Loading**: Changed from loading `.env` from parent directory to loading from current directory
   - Old: `require("dotenv").config({ path: path.join(__dirname, "..", ".env") });`
   - New: `require("dotenv").config();`

2. **CORS Configuration**: Now uses `FRONTEND_URL` environment variable for dynamic frontend URL
   - Default: `http://localhost:5173`
   - Can be overridden via environment variable

3. **Independent Setup**: Backend now has its own `package.json` with all required dependencies

## Development

### Running Tests
```bash
npm test
```

### Code Structure

- **Middleware**: Authentication and role-based access control
- **Routes**: API endpoints organized by feature (auth, admin, company, student)
- **Supabase Integration**: Using Supabase client for database operations
- **File Uploads**: Resume uploads stored in `uploads/resumes/` directory

## Deployment

1. Set environment variables in your hosting platform
2. Ensure `uploads/resumes` directory is writable
3. Run `npm install && npm start`
4. Server will listen on the configured PORT

## Common Issues

### Missing Supabase Keys
Make sure all three Supabase keys are set:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### CORS Errors
Update `FRONTEND_URL` environment variable to match your frontend URL

### File Upload Issues
Ensure `uploads/resumes` directory exists and is writable:
```bash
mkdir -p uploads/resumes
```

## License
ISC
