# Alumni Registration - Next.js Project with Tailwind CSS

This is a modern Next.js application for alumni registration for a 25th Anniversary Reunion. Originally converted from HTML, now enhanced with Tailwind CSS for better maintainability and performance.

## 🌟 Features

- 🎨 **Tailwind CSS Styling** - Utility-first CSS framework for rapid development
- 🎭 **Custom Design System** - Alumni-themed color palette and animations
- 📱 **Mobile-first Responsive** - Beautiful layouts on all screen sizes
- 🌍 **Country Dropdown** - Searchable dropdown with flag icons and keyboard navigation
- 📞 **Smart Phone Formatting** - Automatic formatting based on selected country
- ✅ **Real-time Validation** - Instant feedback with custom error styling
- 🎫 **Ticket Integration** - Direct link to purchase tickets with pre-filled data
- 📝 **Google Forms Sync** - Seamless data collection integration
- ⚡ **Optimized Performance** - Purged CSS and Next.js optimizations
  

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start production server  
npm start
```

## 🎨 Tailwind CSS Integration

### Custom Theme Configuration

The project includes a custom Tailwind configuration with:

- **Alumni Color Palette:**
  - `alumni-gold`: #ffd700 (Primary accent)
  - `alumni-purple`: #8b5cf6 (Buttons & highlights)
  - `alumni-gray`: #a0aec0 (Secondary text)
  - `alumni-light`: #e2e8f0 (Form labels)

- **Custom Animations:**
  - `format-pulse`: Phone number formatting feedback
  - Smooth hover transitions throughout

- **Component Classes:**
  - `.container-alumni`: Main layout container
  - `.form-container`: Form wrapper with glassmorphism effect
  - `.form-input`: Standardized input styling
  - `.submit-btn`: Gradient button with hover effects

### Styling Architecture

```
app/globals.css
├── @tailwind directives
├── @layer base (body & global styles)
├── @layer components (reusable component classes)
└── @layer utilities (responsive overrides)
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Tailwind CSS with custom components
│   ├── layout.tsx          # Root layout with Inter font
│   └── page.tsx            # Home page component
├── components/
│   └── AlumniForm.tsx      # Main form with Tailwind classes
├── data/
│   └── country.json        # Country data with codes and flags
├── public/
│   ├── banner2.jpg         # Header banner image
│   └── bg.png             # Background texture
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS setup
├── package.json           # Dependencies & scripts
├── next.config.js         # Next.js configuration
└── tsconfig.json          # TypeScript settings
```

## 🔧 Configuration Files

### Tailwind Config (`tailwind.config.js`)
- Custom color palette for alumni theme
- Animation keyframes for interactive feedback
- Extended utilities for responsive design

### PostCSS Config (`postcss.config.js`)
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## 🎯 Key Features Converted to Tailwind

1. **Responsive Design**: Mobile-first breakpoints with Tailwind utilities
2. **Form Validation**: Custom error styling with Tailwind components
3. **Interactive Elements**: Hover states and animations using Tailwind
4. **Glassmorphism Effects**: Backdrop blur and opacity utilities
5. **Custom Components**: Reusable classes for consistent styling

## 🌐 Form Integration

- **Google Forms**: Seamless data submission with validation
- **Ticket System**: Dynamic URL generation with encoded user data
- **Phone Formatting**: Country-specific validation and formatting

## 📱 Responsive Breakpoints

- **Mobile**: < 480px (Full width, adjusted padding)
- **Tablet**: < 768px (95% width, medium spacing)
- **Desktop**: > 768px (50% width, full features)

## 🚀 Deployment

### Netlify Configuration
```
Build command: npm run build
Publish directory: out
Node.js version: 22.x
```

### Environment Variables
No environment variables required - all client-side functionality.

## 🛠 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern state management
- **PostCSS**: CSS processing and optimization

## 🎨 Design System

### Colors
- Primary: Alumni Gold (#ffd700)
- Secondary: Alumni Purple (#8b5cf6)
- Background: Dark gradient (custom)
- Text: Light gray (#e2e8f0)

### Typography
- Font: Inter (via Next.js Google Fonts)
- Headings: Gradient text effects
- Body: Consistent spacing and sizing

### Components
- Glass-morphism cards
- Smooth animations
- Custom form controls
- Interactive dropdowns

## 📄 License

This project is for educational and demonstration purposes. 
