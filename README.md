# Advitiya Sharma - Digital Portfolio

An **interactive cinematic portfolio** inspired by diegoliv.works, featuring GSAP-powered animations and editorial design aesthetics.

## ✨ Cinematic Experience

Experience portfolio browsing as an **immersive interactive magazine** with **GSAP animations**, **rotating background words**, and **3D page transitions**.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies (including GSAP):**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to experience the cinematic portfolio.

### Key Dependencies

- **GSAP**: Powers all animations, transitions, and interactive effects
- **React 18**: Modern component-based architecture
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast development and build tooling

### Build for Production

```bash
npm run build
```

## 🎭 Features

- **GSAP-Powered Animations**: Cinematic opening with fade from black and timeline-based sequences
- **Centered Image Card Layout**: Clean centered photo card with rounded corners and shadows
- **Rotating Background Words**: Dynamic word animations (CREATIVITY, CODE, EXPRESSION, etc.) inspired by diegoliv.works
- **3D Page Flip Navigation**: Horizontal page-turn transitions using GSAP rotationY transforms
- **Interactive Button Effects**: Glow pulses, shimmer animations, and hover lift effects with GSAP
- **Editorial Badge Rack**: Angled left-side badge collection with glassmorphism styling
- **League Spartan Typography**: Bold, high-contrast fonts for modern editorial aesthetic
- **No-Scroll Design**: Completely paginated experience with GSAP-only transitions
- **Desktop-Optimized**: Rich interactive experience designed for large screens
- **Modern Tech Stack**: React 18 + TypeScript + Tailwind CSS + GSAP + Vite

## 🎨 Design Elements

- **Hero Photography**: Full viewport height images with dramatic overlays
- **3D Page Transitions**: Realistic page-flip animations with perspective
- **Typography**: Bold, oversized headlines with elegant serif accents
- **Color Palette**: 
  - Indigo (#4A506B) - Featured Section
  - Taupe (#B1A596) - Projects Section
  - Olive (#8A9B82) - Skills Section
  - Purple (#C3B1E1) - Web Wizard Tag
  - Blue-gray (#A6B8C2) - Version Vault Tag
  - Terracotta (#C17C57) - Code Poet Tag
- **Luxurious Buttons**: Gradient backgrounds, soft glows, tactile hover effects
- **Immersive Layout**: Full-screen pages with layered content and depth

## 🎯 Interactive Elements

- **GSAP Page Navigation**: Click buttons for smooth 3D rotationY page-flip transitions
- **Cinematic Opening**: Fade from black overlay with staggered element reveals using GSAP timelines
- **Background Word Rotation**: Continuous cycling typography inspired by diegoliv.works motion style
- **Button Hover System**: GSAP-powered scale, lift, glow pulse, and shimmer effects
- **Timeline Choreography**: Sophisticated element sequencing with GSAP delay and easing
- **Centered Image Focus**: Clean card-based image presentation with GSAP scale animations
- **Editorial Badge Rack**: Angled glassmorphism badge collection with hover micro-interactions
- **No-Scroll Experience**: Completely paginated navigation using GSAP transforms only

## ✨ GSAP Animation Features

- **Cinematic Timeline**: power2.out and expo.out easing for natural, sophisticated motion
- **Rotating Words**: Infinite background word cycles with y-axis movement and rotation
- **Button Microinteractions**: Continuous glow pulses, 15-second shimmer cycles, hover lifts
- **3D Page Flips**: rotationY transforms with transformOrigin for realistic page-turn effect
- **Staggered Reveals**: autoAlpha and transform combinations for smooth element entrances
- **Interactive Feedback**: Scale, translate, and shadow animations responding to user interaction
- **League Spartan Typography**: Bold, high-contrast editorial font for modern magazine aesthetic
- **White Space Design**: Clean background with animated word overlays for visual interest

## 📁 Project Structure

```
├── CoverPage.tsx          # Main GSAP-powered portfolio component
├── src/
│   ├── main.tsx          # React entry point
│   └── index.css         # Tailwind CSS imports
├── index.html            # HTML template with League Spartan fonts
├── package.json          # Dependencies including GSAP
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## 🎬 GSAP Implementation

The portfolio uses GSAP extensively for:

- **Cinematic Opening**: Timeline-based fade from black with staggered reveals
- **Background Words**: Infinite rotation cycles with transform and autoAlpha
- **Page Navigation**: 3D rotationY flips with transformOrigin center
- **Button Effects**: Continuous glow pulses, shimmer cycles, hover interactions
- **Element Choreography**: Sophisticated timing with delay and easing curves

## 🖼️ Image Placeholder

The central image placeholder is ready for your photo. Simply replace the placeholder content in `CoverPage.tsx` with:

```tsx
<img 
  src="/path-to-your-image.jpg" 
  alt="Advitiya Sharma" 
  className="w-48 h-64 object-cover rounded-lg shadow-lg"
/>
```

## 🎯 Customization

- **Content**: Update personal information in `CoverPage.tsx`
- **Colors**: Modify button and badge colors in the component styling
- **Photo**: Replace `/public/coverpage.jpg` with your actual image
- **Background Words**: Customize the `backgroundWords` array for your brand
- **Animations**: Adjust GSAP timing, easing, and effects in the useEffect hooks
- **Typography**: Fonts are loaded via Google Fonts (League Spartan + Space Grotesk)

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🖥️ Desktop Optimization

This portfolio is specifically designed for desktop viewing with:
- Rich GSAP animations and interactions
- Large-scale typography and spacing
- Complex hover effects and micro-interactions
- Immersive full-screen page transitions
- No mobile responsiveness (desktop-first design)

## 🚀 Performance Notes

- GSAP provides hardware-accelerated animations
- All transitions use transform and opacity for optimal performance
- Background words are dynamically created and managed
- Page navigation uses 3D transforms with proper perspective
- Shimmer and glow effects are optimized with GSAP's engine

---

**Portfolio 2025** | **advitiyasharma.dev** | **Connect with me** 