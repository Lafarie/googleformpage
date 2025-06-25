# Alumni Registration - Next.js Project

This is a Next.js application for alumni registration for a 25th Anniversary Reunion. It's converted from the original HTML form to a modern React application.

## Features

- 🎨 Modern, responsive design with beautiful animations
- 📱 Mobile-first responsive layout
- 🌍 Country dropdown with flag icons
- 📞 Automatic phone number formatting based on country
- ✅ Real-time form validation
- 🎫 Direct integration with ticket purchasing system
- 📝 Google Forms integration for data collection

## Getting Started

### Prerequisites

Make sure you have Node.js 18.0 or later installed on your machine.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/
│   └── AlumniForm.tsx      # Main form component
├── data/
│   └── country.json        # Country data with codes and flags
├── public/
│   ├── banner2.jpg         # Banner image
│   └── bg.png             # Background image
├── package.json
├── next.config.js
└── tsconfig.json
```

## Form Integration

The form integrates with:
- **Google Forms**: For collecting registration data
- **Ticket System**: Direct link to purchase tickets with user data pre-filled

## Key Features Converted from HTML

1. **Form Validation**: Real-time validation with error messages
2. **Country Dropdown**: Searchable dropdown with flags and keyboard navigation
3. **Phone Formatting**: Automatic formatting based on selected country
4. **Visual Feedback**: Loading states and success animations
5. **Responsive Design**: Works on all screen sizes

## Deployment

This project is configured for static export and can be deployed to any static hosting service.

For deployment to Vercel:
```bash
npm run build
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **CSS3**: Modern styling with animations
- **React Hooks**: State management and effects

## License

This project is for educational and demonstration purposes. 