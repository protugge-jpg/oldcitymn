# 📋 File Directory & Descriptions

## Project: Old City Mongolia Guesthouse Website

**Location**: `c:\Users\tugge\OneDrive\Skrivbord\locked-in`  
**Status**: ✅ Complete  
**Last Updated**: 2024

---

## 📄 HTML Files

### `index.html` (380 lines)
**Purpose**: Main landing page and booking entry point  
**Features**:
- Hero section with background image
- Navigation bar with admin link
- Accommodations section with room cards and "Book Now" buttons
- Trips section with trip cards and "Book Trip" buttons
- About section with guesthouse information
- Contact preview section with location, email, phone
- 4 booking modals (room, trip, payment, confirmation)
- Footer with copyright info
**Key IDs**: roomBookingModal, tripBookingModal, paymentModal, confirmationModal

### `accommodations.html`
**Purpose**: Dedicated accommodations page  
**Features**:
- Detailed information about rooms
- Room amenities and features
- Booking information
- Navigation maintained for consistency
**Status**: Part of original 5-page structure

### `trips.html`
**Purpose**: Dedicated trips/adventures page  
**Features**:
- Detailed trip descriptions
- Itineraries for each adventure
- Pricing information
- Difficulty levels and requirements
- Navigation maintained for consistency
**Status**: Part of original 5-page structure

### `about.html`
**Purpose**: About Old City Mongolia section  
**Features**:
- Guesthouse history and mission
- Why choose Old City Mongolia
- Team information
- Values and commitments
**Status**: Part of original 5-page structure

### `contact.html`
**Purpose**: Contact information and contact form  
**Features**:
- Contact form
- Address information
- Phone numbers
- Email address
- Hours of operation
- Map location (if integrated)
**Status**: Part of original 5-page structure

### `admin.html` (NEW - 350+ lines)
**Purpose**: Admin dashboard for booking management  
**Features**:
- Booking statistics (total, by type, revenue)
- Booking table with all reservations
- Filter controls (guest name, type, status)
- Status update functionality
- Delete booking functionality
- CSV export capability
- Professional admin styling
**Key IDs**: 
- statsContainer, bookingsTableBody, emptyState
- guestNameFilter, typeFilter, statusFilter
- editStatusModal, editStatusForm
- Export button

### `TEST.html`
**Purpose**: Testing and verification checklist  
**Features**:
- Project status overview
- Feature completion matrix
- Quick links to main pages
- Verification checklist
- Testing information
**Use**: Open in browser to verify all features

---

## 🎨 CSS Files

### `style.css` (730+ lines)
**Purpose**: Complete styling for the entire website  
**Sections**:
1. **Root Variables** - Color scheme and spacing
   - --primary-color: #987654
   - --background-color: #fdf5e6
   - --white: #ffffff
   - --transition: 0.3s ease

2. **Global Styles** - Typography, body styling
   - Font family and sizes
   - Line heights and spacing
   - Base element styling

3. **Navigation Bar** - Responsive navbar
   - Fixed positioning
   - Logo and menu styling
   - Hamburger menu for mobile
   - Hover effects

4. **Hero Section** - Landing page hero
   - Full-width background image
   - Overlay for text readability
   - Title and tagline styling

5. **Card Styles** - Room and trip cards
   - Card containers with shadows
   - Image containers (250px height)
   - Hover zoom effects
   - Title and text styling

6. **Modal Styles** - Booking modals
   - Modal overlay
   - Modal content positioning
   - Close button styling
   - Animation effects

7. **Form Styles** - Booking forms
   - Form groups and labels
   - Input styling and focus states
   - Button styling with hover effects
   - Validation styling

8. **Footer Styles** - Page footer
   - Fixed or relative positioning
   - Copyright and info text

9. **Responsive Design** - Media queries
   - 768px breakpoint (tablet)
   - 480px breakpoint (mobile)
   - Hamburger menu show/hide
   - Layout adjustments

10. **Animations** - Smooth effects
    - Fade in animations
    - Slide down animations
    - Zoom effects
    - Scroll animations

**Key Classes**:
- `.navbar`, `.nav-menu`, `.hamburger`
- `.hero`, `.hero-title`, `.hero-tagline`
- `.card`, `.room-card`, `.trip-card`
- `.modal`, `.modal-active`, `.modal-content`
- `.booking-form`, `.form-group`, `.submit-btn`
- `.status-badge`, `.booking-type`
- `.responsive`, `@media` queries

---

## ⚙️ JavaScript Files

### `script.js` (400+ lines)
**Purpose**: Complete application logic and booking system  
**Features**:

1. **Data Storage**
   - `bookingStorage` object with CRUD methods
   - localStorage integration
   - getBookings(), addBooking(), updateBooking(), deleteBooking()

2. **Data Models**
   - `roomData` - Room types and pricing
   - `tripData` - Trip options and pricing

3. **Price Calculations**
   - calculateRoomPrice() - nights × $25
   - calculateTripPrice() - price × participants

4. **Modal Management**
   - openModal(modalId)
   - closeModal(modalId)
   - closeAllModals()

5. **Form Handlers**
   - handleRoomBooking(event)
   - handleTripBooking(event)
   - processPayment(event)

6. **Event Listeners**
   - Hamburger menu toggle
   - Modal open/close
   - Form submissions
   - Price calculations on change
   - Keyboard escape key handling

7. **Utilities**
   - validateForm()
   - isValidEmail()
   - Scroll animations with Intersection Observer

**Key Functions**:
```javascript
// Data Management
bookingStorage.getBookings()
bookingStorage.addBooking(booking)
bookingStorage.updateBooking(id, updates)
bookingStorage.deleteBooking(id)

// Modal Control
openModal('roomBookingModal')
closeModal('paymentModal')
closeAllModals()

// Booking Workflow
handleRoomBooking(event)
handleTripBooking(event)
processPayment(event)

// Calculations
calculateRoomPrice()
calculateTripPrice()
```

**Global Variables**:
- `bookingStorage` - Booking data management
- `roomData` - Room information
- `tripData` - Trip information
- `window.currentBooking` - Temporary booking holder
- `allBookings` - Cached bookings (admin page)

---

## 📖 Documentation Files

### `README.md`
**Purpose**: Project overview and getting started guide  
**Contents**:
- Project description
- Features overview
- Technology stack
- File structure
- How to use instructions
- Future enhancements

### `ENHANCEMENTS.md`
**Purpose**: Detailed documentation of Phase 2 enhancements  
**Contents**:
- Enhanced design features
- Interactive elements added
- Image integration details
- Modal system improvements
- Scroll animations

### `BOOKING_SYSTEM.md`
**Purpose**: Complete booking system documentation  
**Contents**:
- Phase 1, 2, 3 documentation
- Room and trip details
- Booking process explanation
- Admin dashboard features
- Data structure information
- Testing checklist

### `CHECKLIST.md`
**Purpose**: Comprehensive completion checklist  
**Contents**:
- Feature completion matrix
- Testing checklist
- Quality assurance details
- Code metrics
- File inventory
- Project statistics

### `SUMMARY.md`
**Purpose**: Executive project summary  
**Contents**:
- Project overview
- Deliverables summary
- Key features
- Usage instructions
- Technical specifications
- Future enhancements
- Getting started guide

---

## 📊 Project Statistics

### File Count
- **HTML Files**: 7 (index, 4 pages, admin, test)
- **CSS Files**: 1 (style.css)
- **JavaScript Files**: 1 (script.js)
- **Documentation**: 5 markdown files
- **Total Files**: 14

### Code Statistics
- **Total HTML Lines**: 1000+ combined
- **CSS Lines**: 730+
- **JavaScript Lines**: 400+
- **Documentation Lines**: 2000+ combined

### Feature Count
- **Pages**: 6 main pages
- **Modals**: 4 booking modals
- **Forms**: 3 booking forms
- **API Methods**: 5 (bookingStorage)
- **Admin Features**: 6 major features
- **Responsive Breakpoints**: 3

---

## 🔄 File Dependencies

```
index.html
├── style.css (styling)
└── script.js (functionality)

accommodations.html
├── style.css (styling)
└── script.js (functionality)

trips.html
├── style.css (styling)
└── script.js (functionality)

about.html
├── style.css (styling)
└── script.js (functionality)

contact.html
├── style.css (styling)
└── script.js (functionality)

admin.html
├── style.css (styling)
├── script.js (for navigation)
└── Embeds booking functions and data access

script.js depends on:
└── DOM elements from HTML files
```

---

## 🔐 File Security

### Public Files
- All HTML files
- style.css
- script.js
- All documentation files

### Data Files
- localStorage (client-side, no file)
- No sensitive data exposed

### Access Control
- No authentication system (can be added)
- Admin page accessible to anyone (can be secured)
- No private/sensitive information stored

---

## 📱 Mobile-Specific Files

### Responsive Assets
- `style.css` contains mobile breakpoints at 768px and 480px
- `script.js` handles hamburger menu for mobile
- All modals are mobile-optimized
- Forms adapt to screen size

---

## 🔍 File Search Guide

### To Find...

**Booking Form Fields** → `index.html` (lines 204-260, 265-315)  
**Modal Styling** → `style.css` (lines 518-570)  
**Admin Dashboard** → `admin.html` (complete file)  
**Admin Statistics** → `admin.html` (lines 1-100)  
**Booking Calculation** → `script.js` (lines 91-115)  
**localStorage Usage** → `script.js` (lines 1-40)  
**Modal Management** → `script.js` (lines 118-145)  
**Event Listeners** → `script.js` (lines 230-320)  
**Color Scheme** → `style.css` (lines 1-20)  
**Responsive Design** → `style.css` (lines 580+)

---

## 📥 File Import Order

**When loading in browser**:
1. HTML file loads (HTML content)
2. CSS linked in `<head>` (styling applied)
3. JavaScript linked before `</body>` (functionality enabled)
4. DOM content loaded event fires
5. Event listeners initialized
6. Application ready for use

---

## ✅ File Status

| File | Type | Status | Size | Purpose |
|------|------|--------|------|---------|
| index.html | HTML | ✅ Complete | 380 lines | Main page |
| accommodations.html | HTML | ✅ Complete | Standard | Room details |
| trips.html | HTML | ✅ Complete | Standard | Trip details |
| about.html | HTML | ✅ Complete | Standard | About us |
| contact.html | HTML | ✅ Complete | Standard | Contact info |
| admin.html | HTML | ✅ Complete | 350+ lines | Admin dashboard |
| TEST.html | HTML | ✅ Complete | Full page | Testing |
| style.css | CSS | ✅ Complete | 730+ lines | All styling |
| script.js | JS | ✅ Complete | 400+ lines | All logic |
| README.md | Doc | ✅ Complete | Overview | Project docs |
| ENHANCEMENTS.md | Doc | ✅ Complete | Phase 2 | Feature docs |
| BOOKING_SYSTEM.md | Doc | ✅ Complete | Phase 3 | Booking docs |
| CHECKLIST.md | Doc | ✅ Complete | Full | Completion |
| SUMMARY.md | Doc | ✅ Complete | Full | Executive summary |

---

## 🎯 File Usage Map

### For Website Visitors
Use: index.html → accommodations.html / trips.html → admin.html

### For Administrators
Use: admin.html (booking management and statistics)

### For Developers
Use: All files for understanding and modifications

### For Testing
Use: TEST.html for verification and feature checking

### For Documentation
Use: README.md, BOOKING_SYSTEM.md, CHECKLIST.md, SUMMARY.md

---

## 🚀 Deployment Files

All files in `/locked-in` directory are production-ready and can be deployed to:
- Web hosting services (GoDaddy, Bluehost, HostGator)
- Cloud platforms (AWS, Azure, Google Cloud)
- Static site hosts (GitHub Pages, Netlify, Vercel)
- Traditional web servers (Apache, Nginx)

**No compilation or build process required** - All files are ready to use as-is.

---

*Last Updated: 2024 | Project Status: COMPLETE ✅*
