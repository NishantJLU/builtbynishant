import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import GlowBackground from "@/components/ui/GlowBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingPen from "@/components/ui/FloatingPen";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nishant Singh | AI Systems Engineer & Full-Stack Developer",
  description: "Portfolio of Nishant Singh, building at the intersection of AI, real-time systems, and the web.",
  keywords: ["Nishant Singh", "AI Systems Engineer", "Full-Stack Developer", "Next.js", "React", "Framer Motion", "Bhopal"],
  metadataBase: new URL("https://nishant.systems"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nishant Singh | AI Systems Engineer & Full-Stack Developer",
    description: "Portfolio of Nishant Singh, building at the intersection of AI, real-time systems, and the web.",
    url: "https://nishant.systems",
    siteName: "Nishant Singh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nishant Singh | AI Systems Engineer & Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Singh | AI Systems Engineer & Full-Stack Developer",
    description: "Portfolio of Nishant Singh, building at the intersection of AI, real-time systems, and the web.",
    images: ["/og-image.png"],
    creator: "@NishantSingh",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-800 bg-page-bg selection:bg-neon-cyan/20 selection:text-slate-900 relative">
        {/* Cursor follow ambient spotlight */}
        <GlowBackground />

        {/* 3D Floating stylus roll background */}
        <FloatingPen />

        {/* Ambient Gradient Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-neon-cyan/8 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-neon-purple/6 blur-[150px]" />
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-neon-emerald/5 blur-[120px]" />
          
          {/* Moving scanline */}
          <div className="absolute inset-0 scanlines opacity-[0.05]" />
          
          {/* Subtle Grid Layer */}
          <div className="absolute inset-0 grid-bg opacity-[0.25]" />
 
          {/* 3D perspective Grid Floor */}
          <div className="absolute bottom-0 inset-x-0 h-[50vh] grid-floor-3d opacity-[0.8] pointer-events-none" />
 
          {/* Faint Tech Coordinate Grid Marks */}
          <div className="absolute top-6 left-6 font-mono text-[9px] text-slate-400 opacity-50 pointer-events-none select-none">COORD: [23.25N/77.41E]</div>
          <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-400 opacity-50 pointer-events-none select-none">NODE_STATUS: ONLINE</div>
        </div>
        
        {/* Main Application Container */}
        <div className="relative z-10">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
