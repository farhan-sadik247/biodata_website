# Bio-Data Generator - Professional MERN Application

> **A modern, full-stack bio-data/CV generator with auto-save, Bangladesh address system, and professional export capabilities.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

Bio-Data Generator is a comprehensive web application designed specifically for creating professional bio-data documents commonly used in Bangladesh and South Asian countries for job applications, marriage proposals, and official purposes. Built with cutting-edge technologies (Next.js 15, React 19, MongoDB), it features an intuitive multi-step form wizard, automatic data persistence, integrated Bangladesh geographic data, and high-quality PDF/PNG export capabilities.

### 🎯 Perfect For:
- Job seekers creating professional CVs
- Individuals preparing marriage bio-data
- Students documenting academic achievements
- Professionals maintaining updated credentials
- Anyone needing a formatted personal information document

### ⚡ Quick Start
```bash
# Clone and install
git clone <repository-url>
cd biodata-website
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# Run development server
npm run dev
# Open http://localhost:3000
```

---

## ✨ Key Highlights

- **🎨 Ultra-Modern 3D UI**: Glassmorphic step indicator with pulse, ripple, and shimmer animations
- **💾 Auto-Save Technology**: Automatic data persistence on every step navigation
- **🇧🇩 Bangladesh Address System**: Integrated cascading dropdowns for Division → District → Upazila selection
- **📱 Fully Responsive**: Beautiful on all devices with optimized mobile experience
- **⚡ Real-time Validation**: Instant feedback with React Hook Form
- **🔐 Enterprise Security**: JWT authentication with httpOnly cookies and bcrypt hashing
- **📤 Multi-Format Export**: High-quality PDF (A4) and PNG (300 DPI) export

## 🚀 Core Features

### Authentication & Security
- **Secure Registration/Login**: JWT-based authentication with bcrypt password hashing
- **Protected Routes**: Automatic route protection with authentication middleware
- **User-Specific Data**: Each user can only access their own bio-data
- **Session Management**: Secure httpOnly cookie storage

### Bio-Data Management
- **Multi-Step Wizard**: 5-step form with visual progress tracking
  - Step 1: Personal Information
  - Step 2: Family Information
  - Step 3: Educational Qualification
  - Step 4: Professional Information
  - Step 5: Additional Information
- **Auto-Save Feature**: Data automatically saves when navigating between steps
- **Real-time Notifications**: "✓ Saved" indicator shows successful saves
- **Draft Management**: Create and update drafts before final submission
- **CRUD Operations**: Full create, read, update, and delete functionality

### Address Integration
- **Bangladesh Geodata**: Offline address database with 8 divisions, 64 districts, 492 upazilas
- **Cascading Dropdowns**: Smart dropdown system that filters options based on selection
- **Dual Address Support**: Separate forms for Present and Permanent addresses
- **Flexible Fields**: Post Office and Village/Area as text inputs for accuracy

### Educational Records
- **Comprehensive Fields**: 
  - Name of Examination (SSC, HSC, BSc, MSc, etc.)
  - Group/Subject (Science, Arts, Commerce, Computer Science, etc.)
  - Educational Institute
  - Board/University
  - GPA/CGPA
  - Passing Year
- **Multiple Entries**: Add unlimited education records
- **Table Format Display**: Professional table layout in final output

### Family Information
- **Detailed Records**: Complete information for father, mother, and siblings
  - Name
  - Occupation
  - Designation
  - Designated Area
- **Sibling Management**: Add multiple siblings with relationship types (Brother, Sister, Brother-in-law, Sister-in-law)

### Export Capabilities
- **PDF Export**: Professional A4 format with proper formatting
- **PNG Export**: High-resolution image (300 DPI) for digital use
- **Auto Naming**: Files named with full name and date
- **Print Ready**: Optimized for direct printing

### UI/UX Excellence
- **3D Step Indicator**: 
  - 48px glassmorphic circles with multi-layer shadows
  - Pulse animation (2s)
  - Ripple effect (2.5s)
  - Shimmer animation (2s)
  - 6px animated progress track
- **Form Validation**: Prevents accidental submission with Enter key
- **Conditional Display**: Only shows fields with data in final output
- **Responsive Typography**: Adapts to all screen sizes
- **Smooth Transitions**: Fluid animations throughout

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.6**: Latest App Router with React Server Components
- **React 19**: Cutting-edge React features
- **SCSS Modules**: Component-scoped styling with modern CSS features
- **React Hook Form**: Efficient form state management
- **bd-geodata 1.0.7**: Offline Bangladesh geographic data

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose**: ODM for MongoDB with schema validation
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Secure password hashing (10 salt rounds)

### Export Libraries
- **jsPDF**: High-quality PDF generation
- **html2canvas**: HTML to canvas conversion for exports

### Development Tools
- **ESLint**: Code quality and consistency
- **Port 3000**: Default development server

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd biodata-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```env
MONGODB_URI=MONGODB_URI
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## � Application Workflow

### For New Users
1. **Register**: Create account with email, name, and password
2. **Login**: Authenticate and receive JWT token
3. **Dashboard**: View empty state with "Create Bio-Data" button
4. **Create Bio-Data**: 
   - Fill Step 1 (Personal Info) → Click "Next" → Auto-saves
   - Fill Step 2 (Family Info) → Click "Next" → Auto-saves
   - Fill Step 3 (Education Info) → Click "Next" → Auto-saves
   - Fill Step 4 (Professional Info) → Click "Next" → Auto-saves
   - Fill Step 5 (Additional Info) → Click "Create Bio-Data" → Redirects to Dashboard
5. **View & Export**: Click bio-data card → Preview → Export PDF/PNG
6. **Edit**: Click "Edit" button → Modify any section → Auto-saves on "Next"/"Previous"
7. **Delete**: Click "Delete" on dashboard → Confirm → Permanently removed

### Auto-Save Behavior
- **Create Mode**: First "Next" click creates database record, subsequent clicks update it
- **Edit Mode**: Every "Next" or "Previous" click automatically saves changes
- **Visual Feedback**: Green "✓ Saved" notification appears for 1 second after each save
- **No Data Loss**: Your progress is preserved even if you navigate away

## 📁 Project Structure

```
biodata-website/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Auth pages (no layout)
│   │   │   ├── login/
│   │   │   │   ├── page.jsx
│   │   │   │   └── login.module.scss
│   │   │   └── register/
│   │   │       ├── page.jsx
│   │   │       └── register.module.scss
│   │   ├── (dashboard)/              # Protected pages
│   │   │   ├── dashboard/
│   │   │   │   ├── page.jsx          # Bio-data list
│   │   │   │   └── dashboard.module.scss
│   │   │   ├── create/
│   │   │   │   ├── page.jsx          # Multi-step creation with auto-save
│   │   │   │   └── create.module.scss
│   │   │   ├── edit/[id]/
│   │   │   │   └── page.jsx          # Edit with auto-save
│   │   │   └── preview/[id]/
│   │   │       ├── page.jsx          # Preview & export
│   │   │       └── preview.module.scss
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js
│   │   │   │   ├── logout/route.js
│   │   │   │   ├── me/route.js
│   │   │   │   └── register/route.js
│   │   │   └── biodata/
│   │   │       ├── route.js          # GET all, POST create
│   │   │       └── [id]/
│   │   │           └── route.js      # GET, PUT, DELETE single
│   │   ├── globals.scss              # Global styles
│   │   ├── layout.jsx                # Root layout
│   │   └── page.jsx                  # Landing page
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx    # Route protection HOC
│   │   ├── biodata/
│   │   │   ├── BiodataTemplate.jsx   # Final bio-data display
│   │   │   └── BiodataTemplate.module.scss
│   │   ├── common/
│   │   │   ├── AddressSelector.jsx   # BD address cascading dropdowns
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Input.jsx
│   │   └── forms/
│   │       ├── PersonalInfoForm.jsx   # Step 1
│   │       ├── FamilyInfoForm.jsx     # Step 2
│   │       ├── EducationInfoForm.jsx  # Step 3
│   │       ├── ProfessionalInfoForm.jsx # Step 4
│   │       └── AdditionalInfoForm.jsx # Step 5
│   ├── lib/
│   │   ├── db.js                     # MongoDB connection
│   │   ├── utils.js                  # Helper functions
│   │   └── auth.js                   # Auth middleware
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   └── Biodata.js                # Bio-data schema
│   └── styles/
│       └── _variables.scss           # SCSS variables
├── public/
├── .env.local                        # Environment variables
├── next.config.js                    # Next.js configuration
├── package.json
└── README.md
```

## 🔐 Authentication Flow

1. **Register**: 
   - User provides: Full Name, Email, Password
   - Backend: Hashes password with bcrypt (10 rounds)
   - Creates user record in MongoDB
   - Redirects to login

2. **Login**: 
   - User provides: Email, Password
   - Backend: Validates credentials
   - Generates JWT token with user ID and email
   - Stores token in httpOnly cookie (7 days expiry)
   - Redirects to dashboard

3. **Protected Routes**: 
   - Middleware checks JWT token on each request
   - Validates token and extracts user info
   - Grants access to dashboard, create, edit, preview pages
   - Unauthorized users redirected to login

4. **Logout**: 
   - Clears authentication cookie
   - Redirects to login page

## 📝 Bio-Data Sections & Fields

### 1. Personal Information
- Full Name (required)
- Date of Birth
- Gender
- Religion
- Marital Status
- Blood Group
- Height
- Weight
- Nationality
- Contact Number
- Email
- **Present Address**:
  - Division (dropdown)
  - District (dropdown - filtered by division)
  - Upazila (dropdown - filtered by district)
  - Post Office (text input)
  - Village/Area (text input)
  - Full Address (textarea)
- **Permanent Address**: (same structure as present address)

### 2. Family Information
- **Father's Details**:
  - Name
  - Occupation
  - Designation
  - Designated Area
- **Mother's Details**:
  - Name
  - Occupation
  - Designation
  - Designated Area
- **Siblings** (multiple entries):
  - Relation (Brother, Sister, Brother-in-law, Sister-in-law)
  - Name
  - Occupation
  - Designation
  - Designated Area

### 3. Educational Qualification
Multiple entries with:
- Name of Examination (degree) - SSC, HSC, BSc, MSc, PhD, etc.
- Group/Subject - Science, Arts, Commerce, Computer Science, etc.
- Educational Institute
- Board/University
- GPA/CGPA
- Passing Year

**Display**: Formatted as professional table with 7 columns

### 4. Professional Information
- Current Position
- Organization
- Years of Experience
- Key Responsibilities (textarea)

### 5. Additional Information
- **Hobbies** (array): Reading, Sports, Music, etc.
- **Skills** (array): Programming, Design, Management, etc.
- **Languages** (array): Bengali, English, Hindi, etc.

**Note**: All sections support Enter key to add items (except in textareas where Enter creates new lines)

## 🎨 Design Features

### 3D Step Indicator
- **Glassmorphic Circles**: 48px diameter with backdrop blur
- **Multi-Layer Shadows**: Creates depth perception
- **Animations**:
  - Pulse animation: 2s infinite (active step)
  - Ripple effect: 2.5s infinite (expanding circles)
  - Shimmer animation: 2s infinite (light sweep)
- **Progress Track**: 6px height with gradient fill animation
- **Responsive**: Adapts to mobile screens (smaller circles, adjusted spacing)

### Form Experience
- **Enter Key Prevention**: Prevents accidental form submission
  - Works in text inputs (adds items to arrays instead)
  - Allows Enter in textareas (for multi-line content)
- **Real-time Validation**: Instant feedback on input errors
- **Conditional Rendering**: Only shows filled fields in final output
- **Auto-Save Notification**: Green success badge appears on save

### Visual Elements
- **Gradient Backgrounds**: Multi-stop color transitions
- **Card Hover Effects**: Subtle elevation and scale on hover
- **Smooth Transitions**: All state changes animated
- **Loading States**: Spinners and disabled states during async operations
- **Empty States**: Helpful messages when no data exists

### Color Palette
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#4CAF50` (Green)
- Danger: `#ef4444` (Red)
- Background: `#f8fafc` (Light Gray)
- Cards: `#ffffff` with shadow

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
  - Single column layout
  - Stacked form fields
  - 40px step circles
  - Touch-optimized buttons
- **Tablet**: 640px - 1024px
  - Two-column forms
  - 44px step circles
  - Adjusted spacing
- **Desktop**: > 1024px
  - Full-width layouts
  - 48px step circles
  - Optimal spacing

### Mobile Optimizations
- Larger touch targets (min 44x44px)
- Simplified navigation
- Optimized font sizes
- Scrollable tables with horizontal overflow
- Bottom-fixed action buttons on mobile

## 🔒 Security Features

- **Password Security**:
  - Bcrypt hashing with 10 salt rounds
  - Minimum 6 characters required
  - Never stored in plain text
- **JWT Authentication**:
  - Tokens stored in httpOnly cookies (prevents XSS attacks)
  - 7-day expiration
  - Signed with secret key
- **API Security**:
  - Authentication middleware on all protected routes
  - User-specific data access (can't access others' bio-data)
  - MongoDB injection prevention through Mongoose
- **Input Validation**:
  - Client-side validation with React Hook Form
  - Server-side validation before database operations
  - Sanitization of user inputs
- **CORS Configuration**: Proper cross-origin policies
- **Environment Variables**: Sensitive data stored in .env.local

## 📤 Export Features

### PDF Export
- **Format**: A4 size (210mm x 297mm)
- **Resolution**: High quality for printing
- **Process**: 
  1. Renders bio-data template
  2. Captures as canvas with html2canvas
  3. Converts to PDF with jsPDF
  4. Auto-downloads with formatted filename
- **Filename**: `{Full_Name}_Biodata_{Date}.pdf`
- **Use Case**: Official submissions, printing

### PNG Export
- **Resolution**: 300 DPI (print quality)
- **Process**:
  1. Renders bio-data template
  2. Captures as high-res canvas
  3. Converts to PNG blob
  4. Triggers download
- **Filename**: `{Full_Name}_Biodata_{Date}.png`
- **Use Case**: Digital sharing, online applications

## 🧪 Testing Checklist

### Authentication Testing
- [x] User registration with valid data
- [x] Registration validation (email format, password length)
- [x] Login with correct credentials
- [x] Login rejection with wrong password
- [x] Protected route redirection when not logged in
- [x] Logout functionality
- [x] Session persistence (refresh page while logged in)

### Bio-Data CRUD Testing
- [x] Create new bio-data with all fields
- [x] Create with partial data (optional fields empty)
- [x] Auto-save on step navigation
- [x] Edit existing bio-data
- [x] Delete bio-data with confirmation
- [x] View bio-data list on dashboard
- [x] Preview bio-data in formatted view

### Address System Testing
- [x] Division dropdown loads all 8 divisions
- [x] District dropdown filters by selected division
- [x] Upazila dropdown filters by selected district
- [x] Post Office accepts text input
- [x] Village/Area accepts text input
- [x] Both present and permanent addresses display correctly

### Form Behavior Testing
- [x] Enter key prevented in text inputs (no form submission)
- [x] Enter key works in textareas (creates new lines)
- [x] Add Education entry button works
- [x] Remove Education entry button works
- [x] Add Sibling entry button works
- [x] Array fields (hobbies, skills, languages) accept Enter key
- [x] "✓ Saved" notification appears on auto-save

### Export Testing
- [x] PDF export generates correct file
- [x] PNG export generates correct file
- [x] Filenames formatted correctly
- [x] All data visible in exported files
- [x] Empty fields excluded from export

### Responsive Testing
- [x] Mobile view (< 640px)
- [x] Tablet view (640px - 1024px)
- [x] Desktop view (> 1024px)
- [x] Step indicator responsive
- [x] Forms responsive
- [x] Tables scrollable on mobile

## 🚀 Deployment

### Vercel (Recommended)

1. **Prepare Repository**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

3. **Environment Variables**:
Add these in Vercel dashboard:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret_key
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

4. **Deploy**: Click "Deploy" and wait for build completion

### Manual Deployment (VPS/Cloud)

1. **Install Node.js** (v18+ required)
2. **Clone repository** on server
3. **Install dependencies**: `npm install`
4. **Build application**: `npm run build`
5. **Set environment variables** in `.env.local`
6. **Start production server**: `npm start`
7. **Configure reverse proxy** (Nginx/Apache)
8. **Set up SSL certificate** (Let's Encrypt)

### Important Notes
- ⚠️ **Change JWT_SECRET** in production (use long random string)
- ⚠️ **Secure MongoDB credentials** (create production database user)
- ⚠️ **Enable MongoDB IP whitelist** or use VPN
- ⚠️ **Set up monitoring** (error tracking, performance)
- ⚠️ **Configure CORS** properly for production domain

## 🎯 Future Enhancements

### Planned Features
- [ ] **Email Verification**: Verify user email on registration
- [ ] **Password Reset**: Forgot password functionality with email
- [ ] **Profile Picture Upload**: Add photo to bio-data
- [ ] **Multiple Templates**: Different bio-data designs/formats
- [ ] **Share via Link**: Generate unique shareable links
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Multi-language Support**: Bengali, English, Hindi
- [ ] **Social Media Login**: OAuth with Google, Facebook
- [ ] **Bio-Data Analytics**: View count, download statistics
- [ ] **Bulk Export**: Export multiple bio-datas as ZIP
- [ ] **Custom Branding**: Add company logo, watermarks
- [ ] **Version History**: Track changes to bio-data
- [ ] **Comments/Notes**: Add private notes to bio-data
- [ ] **Print Preview**: See how bio-data looks before printing

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Offline functionality with service workers
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] SEO optimization for public profiles
- [ ] Accessibility improvements (WCAG 2.1 AA compliance)
- [ ] Unit and integration tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## 🐛 Known Issues

- None currently reported

## 💡 Tips & Best Practices

### For Users
1. **Fill All Fields**: More complete data = better bio-data
2. **Use Proper Capitalization**: Names and titles look professional
3. **Keep It Concise**: Avoid overly long descriptions
4. **Proofread**: Check for typos before exporting
5. **Update Regularly**: Keep education and experience current

### For Developers
1. **Environment Variables**: Never commit `.env.local` to Git
2. **Database Backups**: Schedule regular MongoDB backups
3. **Error Handling**: Monitor API errors and logs
4. **Performance**: Use Next.js Image component for photos
5. **Security**: Keep dependencies updated
6. **Code Quality**: Run ESLint before committing

## 📞 Support & Contribution

### Getting Help
- **Issues**: Report bugs via GitHub Issues
- **Questions**: Use GitHub Discussions
- **Email**: contact@yourproject.com (replace with actual)

### Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Test your changes thoroughly

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 200 OK
Set-Cookie: token=<jwt_token>; HttpOnly; Path=/; Max-Age=604800
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Logout User
```http
POST /api/auth/logout

Response: 200 OK
Set-Cookie: token=; HttpOnly; Path=/; Max-Age=0
{
  "success": true,
  "message": "Logout successful"
}
```

### Bio-Data Endpoints

#### Get All User's Bio-Datas
```http
GET /api/biodata
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "biodatas": [...]
}
```

#### Get Single Bio-Data
```http
GET /api/biodata/:id
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "biodata": {...}
}
```

#### Create Bio-Data
```http
POST /api/biodata
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "personalInfo": {...},
  "familyInfo": {...},
  "educationInfo": [...],
  "professionalInfo": {...},
  "additionalInfo": {...}
}

Response: 201 Created
{
  "success": true,
  "message": "Bio-data created successfully",
  "biodata": {...}
}
```

#### Update Bio-Data
```http
PUT /api/biodata/:id
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "personalInfo": {...},
  ...
}

Response: 200 OK
{
  "success": true,
  "message": "Bio-data updated successfully",
  "biodata": {...}
}
```

#### Delete Bio-Data
```http
DELETE /api/biodata/:id
Cookie: token=<jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Bio-data deleted successfully"
}
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, bcrypt hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Biodata Model
```javascript
{
  userId: ObjectId (ref: User, required),
  personalInfo: {
    fullName: String,
    dateOfBirth: Date,
    gender: String,
    religion: String,
    maritalStatus: String,
    bloodGroup: String,
    height: String,
    weight: String,
    nationality: String,
    contactNumber: String,
    email: String,
    presentAddress: {
      division: String,
      district: String,
      upazila: String,
      postOffice: String,
      village: String,
      fullAddress: String
    },
    permanentAddress: {
      division: String,
      district: String,
      upazila: String,
      postOffice: String,
      village: String,
      fullAddress: String
    }
  },
  familyInfo: {
    father: {
      name: String,
      occupation: String,
      designation: String,
      designatedArea: String
    },
    mother: {
      name: String,
      occupation: String,
      designation: String,
      designatedArea: String
    },
    siblings: [{
      relation: String (enum: ['Brother', 'Sister', 'Brother-in-law', 'Sister-in-law']),
      name: String,
      occupation: String,
      designation: String,
      designatedArea: String
    }]
  },
  educationInfo: [{
    degree: String,
    subject: String,
    group: String,
    institution: String,
    passingYear: String,
    result: String,
    gpa: String,
    cgpa: String,
    board: String,
    university: String
  }],
  professionalInfo: {
    currentPosition: String,
    organization: String,
    experience: String,
    responsibilities: String
  },
  additionalInfo: {
    hobbies: [String],
    skills: [String],
    languages: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Developer

**Farhan Sadik**
- Full Stack Developer
- Specialized in MERN Stack Development
- Next.js & React Expert

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **MongoDB Team**: For the flexible NoSQL database
- **Vercel**: For seamless deployment platform
- **React Hook Form**: For efficient form management
- **bd-geodata**: For Bangladesh geographic data
- **jsPDF & html2canvas**: For export functionality
- **Open Source Community**: For countless helpful packages

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Hook Form](https://react-hook-form.com/)
- [bd-geodata Package](https://www.npmjs.com/package/bd-geodata)
- [Vercel Deployment Docs](https://vercel.com/docs)

## � Project Stats

- **Version**: 1.0.0
- **Next.js**: 15.5.6
- **React**: 19
- **Node Version**: 18+
- **Database**: MongoDB Atlas
- **Package Manager**: npm
- **Code Style**: ESLint
- **Styling**: SCSS Modules
- **Lines of Code**: ~5000+

## 🎓 Learning Resources

If you're learning from this project:
1. **Next.js App Router**: Study the route structure and layouts
2. **React Hook Form**: See how forms are managed efficiently
3. **MongoDB Integration**: Learn schema design and queries
4. **JWT Authentication**: Understand secure auth implementation
5. **SCSS Modules**: Component-scoped styling patterns
6. **API Routes**: RESTful API design in Next.js

---

## ⚠️ Important Notes

1. **Security**: 
   - Change `JWT_SECRET` before production deployment
   - Use strong MongoDB passwords
   - Never expose API keys in client-side code

2. **Performance**:
   - MongoDB Atlas free tier has limitations (512MB storage)
   - Consider upgrading for production use
   - Optimize images before uploading

3. **Maintenance**:
   - Keep dependencies updated: `npm update`
   - Monitor for security vulnerabilities: `npm audit`
   - Regular database backups recommended

4. **Support**:
   - This project is maintained as open source
   - Community contributions welcome
   - Issues and PRs actively reviewed

---

**Built with ❤️ using Next.js 15 and React 19**

*For questions, issues, or contributions, please visit the GitHub repository.*
