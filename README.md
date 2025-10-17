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
git clone https://github.com/farhan-sadik247/biodata_website.git
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
git clone https://github.com/farhan-sadik247/biodata_website.git
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



**Built with ❤️ using Next.js 15 and React 19**

*For questions, issues, or contributions, please visit the GitHub repository.*
