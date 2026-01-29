# Old City Mongolia - Guesthouse Website

A beautiful, responsive website for a Mongolian guesthouse built with HTML5, CSS3, and vanilla JavaScript. Features interactive modals, stunning images, and smooth animations.

## 📁 Project Structure

```
locked-in/
├── index.html              # Main landing page with interactive cards & modals
├── accommodations.html     # Accommodations page with room details
├── trips.html             # Trips and tours page
├── about.html             # About the guesthouse
├── contact.html           # Contact form and information
├── style.css              # All styling and responsive design
├── script.js              # Navigation, modals, and form handling
└── README.md              # This file
```

## 🎨 Features

### Design & UX
- **Warm Color Palette**: Primary color #987654 (warm brown), background #fdf5e6 (cream), accents with white
- **Full-Width Hero**: Beautiful background image with overlay and fade-in animation
- **Interactive Cards**: Clickable room and trip cards with modal popups
- **Image Integration**: Professionally styled images throughout
- **Smooth Animations**: Fade-in effects, slide-down animations, hover transitions, and image zoom effects
- **Modern & Minimal**: Clean, uncluttered interface with excellent readability
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, modal support

### Navigation
- **Sticky Navigation Bar** with logo and menu links
- **Hamburger Menu** for mobile devices with smooth animations
- **Smooth Scrolling** between sections
- **Active States** showing current page

### Pages Included
1. **Home (index.html)** - Enhanced hero with image cards and modals
2. **Accommodations** - Details about room types and amenities
3. **Trips & Tours** - Adventure options with descriptions
4. **About Us** - Guesthouse history, mission, values, testimonials, and images
5. **Contact** - Contact form, location info, and FAQs

### Interactive Elements
- **Room Modal Cards** - Click to see room details in a popup
- **Trip Modal Cards** - Click to see trip details in a popup
- **Image Gallery** - Mongolian nature images throughout
- **Mobile-Responsive** - Hamburger navigation menu
- **Contact Form** - Validation and feedback
- **Scroll Animations** - Fade-in effects on scroll
- **Keyboard Support** - Close modals with Escape key

## ✨ New Features in This Version

### Hero Section
- Full-width background image of Mongolian landscapes
- Overlay gradient for text contrast
- Fade-in animation on page load
- Responsive image scaling

### Landing Page Enhancements
- **Rooms Section**: Two clickable room cards (Male & Female) with modals
- **Trips Section**: Four clickable trip cards with detailed modals
- **About Section**: Added Mongolian landscape image
- **Contact Section**: Quick preview with contact information

### Modal System
- **Room Modals**: Display room details, amenities, and images
- **Trip Modals**: Show trip duration, difficulty, description, and inclusions
- **Close Options**: Click X button, click outside modal, or press Escape
- **Smooth Animations**: Fade-in and slide-down effects
- **Accessible**: Proper focus management and ARIA support

### Image Styling
- **Card Images**: Optimized image display with hover zoom effect
- **Lazy Loading**: Images load on demand for better performance
- **Responsive**: Images scale properly on all devices
- **High Quality**: Using professional photography from Unsplash

## 🚀 How to Use

### Running Locally
1. Download or clone all files to your computer
2. Open `index.html` in any modern web browser
3. Click on room or trip cards to see modal details
4. Use the navigation menu to explore different pages
5. Test the hamburger menu on mobile devices or by resizing your browser

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ File Descriptions

### index.html
The main landing page featuring:
- Hero section with background image and CTA
- Interactive room cards with modal functionality
- Interactive trip cards with modal functionality
- About section with image
- Contact preview section
- Responsive navigation and footer

### style.css
Complete styling with:
- CSS Variables for easy color customization
- Hero section with background image and overlay
- Card styling with image containers and hover effects
- Modal styling with animations and responsiveness
- Mobile-first responsive design
- Smooth transitions and animations
- Form styling and accessibility features

### script.js
JavaScript functionality including:
- Modal open/close functionality for rooms and trips
- Room and trip data objects with detailed information
- Mobile hamburger menu toggle
- Menu close on link click
- Smooth scrolling for anchor links
- Intersection Observer for scroll animations
- Form validation helpers
- Keyboard support (Escape to close modals)
- Window resize handling

### Subpages (accommodations.html, trips.html, about.html, contact.html)
Each subpage includes:
- Consistent navigation and footer
- Detailed content blocks
- Card-based layouts for items/trips/testimonials
- Page-specific styling using shared CSS

## 🎯 Customization Guide

### Changing Colors
Open `style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #987654;        /* Change main brown color */
    --background-color: #fdf5e6;     /* Change background cream */
    --white: #ffffff;                /* Change white */
    --dark-text: #333333;            /* Change text color */
    /* ... etc */
}
```

### Replacing Images
Update image URLs in:
- **Hero background**: In `style.css` within `.hero` class
- **Room cards**: In `index.html` in the room card image tags
- **Trip cards**: In `index.html` in the trip card image tags
- **Room/Trip modals**: In `script.js` in `roomData` and `tripData` objects

Example:
```javascript
const roomData = {
    male: {
        image: 'your-image-url-here',
        // ... other properties
    }
}
```

### Adding New Rooms or Trips
1. Add data object to `script.js`:
```javascript
const roomData = {
    newRoom: {
        title: 'Room Title',
        image: 'image-url',
        description: 'Description',
        amenities: ['amenity1', 'amenity2']
    }
}
```

2. Add card HTML to `index.html`:
```html
<div class="card room-card" data-room="newRoom">
    <div class="card-image">
        <img src="image-url" alt="Room description">
    </div>
    <h3 class="card-title">Room Title</h3>
    <div class="card-content">
        <p>Short description</p>
    </div>
</div>
```

### Modifying Modal Content
Edit the data objects in `script.js`:
```javascript
const tripData = {
    gobi: {
        title: 'Gobi Desert Expedition',
        image: 'image-url',
        duration: 'Duration: X days',
        difficulty: 'Difficulty level',
        description: 'Full description',
        includes: 'What is included'
    }
}
```

## ♿ Accessibility Features

- Semantic HTML5 tags (`<nav>`, `<main>`, `<footer>`, etc.)
- ARIA labels on navigation and form elements
- Focus visible states for keyboard navigation
- Proper heading hierarchy
- Image alt text for all images
- Color contrast ratio meets WCAG standards
- Form validation with clear error messages
- Modal keyboard support (Escape to close)
- Loading attributes for lazy loading images

## 📱 Mobile Responsiveness

The site automatically adapts to:
- **Small phones** (320px - 480px)
- **Tablets** (481px - 768px)
- **Desktops** (769px and up)

The hamburger menu appears on screens smaller than 768px and automatically closes when:
- A navigation link is clicked
- Window is resized to desktop size
- User clicks outside the menu

Modals also resize appropriately:
- Desktop: Max 600px width, centered
- Mobile: 90% width with proper spacing

## 🔧 Modal System Details

### How Modals Work
1. Click a room or trip card to trigger the modal
2. Modal displays with fade-in animation
3. Content loads from `roomData` or `tripData` objects
4. Close with X button, clicking outside, or Escape key

### Modal Data Structure
```javascript
const roomData = {
    roomKey: {
        title: 'Room Title',
        image: 'url',
        description: 'Full description',
        amenities: ['amenity1', 'amenity2']
    }
}
```

## 📝 Code Quality

- **Well-commented** code for easy understanding
- **Beginner-friendly** JavaScript without frameworks
- **DRY principles** - Shared CSS and JavaScript across pages
- **Semantic HTML** - Proper use of HTML5 elements
- **Progressive enhancement** - Works without JavaScript (degraded)
- **Data-driven** - Easy to update room/trip information

## 🌐 Deployment

To deploy this website:
1. Upload all files to a web hosting service
2. Ensure all files are in the same directory
3. Point your domain to the hosting location
4. The site is static, so no server-side setup needed

Popular hosting options:
- GitHub Pages (free)
- Netlify (free tier available)
- Vercel (free tier available)
- Traditional web hosting services

## 📞 Support for Developers

Key points for future development:
- All styles are in `style.css` - easy to find and modify
- JavaScript is vanilla (no frameworks) - easy to understand and extend
- Modal data is in `script.js` - easy to update
- HTML is semantic and well-structured
- Each page is independent but shares common styles
- Images use Unsplash (free) - can be replaced with custom images
- Consider adding a `logo.png` file and linking it in navbar

## 🚀 Future Enhancement Ideas

- Replace Unsplash images with custom photography
- Add image carousel to hero section
- Integrate with a booking system
- Add customer testimonial slideshow
- Create a blog section
- Add multi-language support
- Integrate with map API for location display
- Add email notification for contact form
- Implement dark mode toggle
- Add weather widget
- Create a full photo gallery with lightbox
- Add booking calendar
- Implement user reviews system
- Add video tours of rooms and destinations

## 📄 License

This website template is provided as-is for use by Old City Mongolia. Feel free to modify and customize for your needs.

---

**Created with ❤️ for authentic travel experiences**

For updates or assistance with this website, please contact the development team.
#   o l d c i t y m n  
 