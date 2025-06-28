import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alumni Registration - 25th Anniversary Reunion | University of Colombo",
  description: "Join us for the University of Colombo Alumni 25th Anniversary Reunion celebration. Register now to reconnect with fellow graduates and celebrate our milestone together.",
  keywords: ["alumni reunion", "University of Colombo", "25th anniversary", "graduation celebration", "alumni registration", "university reunion", "Sri Lanka alumni", "UOC alumni"],
  authors: [{ name: "University of Colombo Alumni Association" }],
  creator: "University of Colombo Alumni Association",
  publisher: "University of Colombo",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",

  // Open Graph tags for social media sharing
  openGraph: {
    title: "Alumni Registration - 25th Anniversary Reunion | University of Colombo",
    description: "Join us for the University of Colombo Alumni 25th Anniversary Reunion celebration. Register now to reconnect with fellow graduates.",
    url: "https://uocalumni.netlify.app/",
    siteName: "UOC Alumni Reunion",
    images: [
      {
        url: "https://uocalumni.netlify.app/banner2.jpg",
        width: 1200,
        height: 630,
        alt: "University of Colombo 25th Anniversary Alumni Reunion Banner",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: "Alumni Registration - 25th Anniversary Reunion | University of Colombo",
    description: "Join us for the University of Colombo Alumni 25th Anniversary Reunion celebration. Register now to reconnect with fellow graduates.",
    images: ["https://uocalumni.netlify.app/banner2.jpg"],
    creator: "@UOCAlumni", // Update with your actual Twitter handle
    site: "@UOCAlumni", // Update with your actual Twitter handle
  },

  // Additional meta tags
  category: "Education",
  classification: "Alumni Event",

  // Favicon and icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/icon.png" },
      { rel: "android-chrome-512x512", url: "/icon.png" },
    ],
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "University of Colombo Alumni 25th Anniversary Reunion",
              description: "A celebration of 25 years since graduation, bringing together alumni from the University of Colombo.",
              startDate: "2024-12-01", // Update with actual date
              location: {
                "@type": "Place",
                name: "University of Colombo",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Cumaratunga Munidasa Mawatha",
                  addressLocality: "Colombo",
                  addressCountry: "LK",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "University of Colombo Alumni Association",
                url: "https://uocalumni.netlify.app/", // Update with actual URL
              },
              image: "https://uocalumni.netlify.app/banner2.jpg", // Update with actual URL
              offers: {
                "@type": "Offer",
                url: "https://uocalumni.netlify.app/", // Update with actual URL
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />

                 {/* Additional SEO meta tags */}
         <meta name="theme-color" content="#534088" />
         <meta name="msapplication-TileColor" content="#534088" />
         <meta name="format-detection" content="telephone=no" />

         {/* Additional Open Graph tags for better WhatsApp compatibility */}
         <meta property="og:title" content="Alumni Registration - 25th Anniversary Reunion | University of Colombo" />
         <meta property="og:description" content="Join us for the University of Colombo Alumni 25th Anniversary Reunion celebration. Register now to reconnect with fellow graduates." />
         <meta property="og:image" content="https://uocalumni.netlify.app/banner2.jpg" />
         <meta property="og:image:width" content="1200" />
         <meta property="og:image:height" content="630" />
         <meta property="og:image:type" content="image/jpeg" />
         <meta property="og:url" content="https://uocalumni.netlify.app/" />
         <meta property="og:type" content="website" />
         <meta property="og:site_name" content="UOC Alumni Reunion" />

         {/* Twitter Card tags for better sharing */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content="Alumni Registration - 25th Anniversary Reunion | University of Colombo" />
         <meta name="twitter:description" content="Join us for the University of Colombo Alumni 25th Anniversary Reunion celebration." />
         <meta name="twitter:image" content="https://uocalumni.netlify.app/banner2.jpg" />

         {/* Canonical URL */}
        <link rel="canonical" href="https://uocalumni.netlify.app/" />

        {/* Preload critical resources */}
        <link rel="preload" href="/banner2.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/bg2.png" as="image" type="image/png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
