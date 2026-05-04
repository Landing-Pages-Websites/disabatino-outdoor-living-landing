import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Outdoor Living Design & Build in Delaware County | DiSabatino Landscaping",
  description:
    "DiSabatino Landscaping creates custom patios, pergolas, outdoor kitchens, hardscaping, and luxury landscape designs in Delaware County, PA and Northern Delaware. 30+ years. Speak with a designer.",
  openGraph: {
    title: "Outdoor Living Spaces | DiSabatino Landscaping",
    description:
      "Custom patios, pergolas, outdoor kitchens, hardscaping & luxury landscape design. Serving Delaware County, the Main Line & Northern Delaware for 30+ years.",
    images: ["/images/hero-outdoor-living.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* MegaTag — site_key injected after site registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"sk_morkk4an_zh29pn4ijnr",gtmId:"",pixelId:"954247080070263"};`,
          }}
        />
        <script src="https://cdn.gomega.ai/scripts/optimizer.min.js" async />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
