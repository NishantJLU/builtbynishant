# builtbynishant 🤖

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Typescript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A high-performance, immersive portfolio built at the intersection of **AI**, **real-time systems**, and the **web**. This project features a unique "cyber-systems" aesthetic with interactive telemetry widgets, a custom terminal OS, and fluid animations.


---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/NishantJLU/builtbynishant.git

# Navigate to the directory
cd builtbynishant

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Cutting-edge utility-first CSS)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Scrolling:** [Lenis](https://lenis.darkroom.engineering/) (Smooth scroll)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Key Features

### 🖥️ AI Systems Terminal
An interactive command-line interface simulation allowing users to query system logs, unlock "secrets," and explore project metadata in real-time. Try typing `help` or `secret`.

### 📊 Real-time Telemetry Widgets
- **Vector Radar:** Canvas-based target tracking system.
- **CPU Graph:** Live-simulated performance monitoring.
- **Compiler Feed:** Dynamic build log streaming simulation.
- **Live System Clock:** Millisecond-accurate precision.

### 🍱 Bento Grid Specialties
A responsive grid layout highlighting core skills in UI Engineering, Infrastructure, AI/Data Architectures, and Game Design.

### 🎨 Cyber-Systems Aesthetic
- **CRT Effects:** Scanlines, flicker, and phosphor-glow overlays.
- **Glassmorphism:** Modern blurred panels with neon accents.
- **3D Transitions:** Perspective-based tilt effects and wireframe animations.

---

## 📁 Project Structure

```text
builtbynishant/
├── src/
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── components/     # UI Components & Telemetry Widgets
│   └── config/         # (Planned) Site configuration & project data
├── public/             # Static assets
└── tailwind.config.js  # Theme & styling configurations
```

---

## 🛡 Security & Optimization

- **CSP Headers:** Robust Content Security Policy configured in `next.config.ts`.
- **Type Safety:** 100% TypeScript coverage for reliable development.
- **Performance Optimization:** 
  - **On-Demand Canvas Rendering:** Signature tracer halts its `requestAnimationFrame` loop when the page is idle, reducing background CPU/GPU rendering overhead to 0%.
  - **Zero-Jank Scrolling:** Removed fullscreen real-time SVG turbulence filters and dynamic CSS blur filters to ensure stable 60fps+ scrolling.
  - **Batched Canvas Drawing:** Background network vertices calculations avoid `Math.sqrt` and batch connection segments into a single `.stroke()` call to minimize draw calls.
  - **Virtual DOM Bypass:** The interactive spotlight orb directly mutates styling through DOM references on mousemove, preventing constant React state re-renders.

---

## 👤 Author

**Nishant Singh**
- GitHub: [@NishantJLU](https://github.com/NishantJLU)
- LinkedIn: [nishantsingh-dev](https://www.linkedin.com/in/nishantsingh-dev/)
- Reddit: [u/Emergency-Shine-2656](https://www.reddit.com/user/Emergency-Shine-2656/)

---

## 📄 License

This project is private and for portfolio purposes. All rights reserved.

---
*Built with too little sleep and too much coffee.*
