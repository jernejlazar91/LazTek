import JsonLd from "@/components/engineering/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import SiteFooter from "@/components/SiteFooter";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./engineering.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laztek.si"),

  title: {
    default:
      "LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj",
    template: "%s | LazTek Engineering",
  },

  description:
    "Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje, 3D modeliranje, prototipizacija in izdelava funkcionalnih tehničnih delov.",

  keywords: [
    "LazTek",
    "LazTek Engineering",
    "industrijski 3D tisk",
    "3D tisk Slovenija",
    "3D skeniranje",
    "reverse engineering",
    "povratni inženiring",
    "konstruiranje",
    "3D modeliranje",
    "CAD modeliranje",
    "prototipizacija",
    "tehnični deli",
    "3D tisk PA6 CF",
    "3D tisk kompozitov",
    "velikoformatni 3D tisk",
  ],

  creator: "LazTek Engineering",
  publisher: "LazTek Engineering",

  openGraph: {
    type: "website",
    locale: "sl_SI",
    url: "https://laztek.si",
    siteName: "LazTek Engineering",

    title: "LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj",

    description:
      "Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje, 3D modeliranje in prototipizacija.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "LazTek Engineering - Industrijski 3D tisk, 3D skeniranje in razvoj",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj",

    description:
      "Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje in prototipizacija.",

    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

function LaztekBackground() {
  return (
    <div className="laztek-background pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#EAF4F8]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(255,255,255,0.96) 0%, rgba(250,252,253,0.90) 18%, transparent 42%),
            radial-gradient(circle at 54% 44%, rgba(198,231,238,0.74) 0%, rgba(198,231,238,0.28) 24%, transparent 58%),
            radial-gradient(circle at 90% 18%, rgba(10,96,145,0.58) 0%, rgba(10,96,145,0.30) 26%, transparent 58%),
            radial-gradient(circle at 86% 78%, rgba(8,129,153,0.44) 0%, rgba(8,129,153,0.18) 24%, transparent 60%),
            linear-gradient(116deg, #F9FBFC 0%, #EDF4F7 30%, #D8E9EF 56%, #8FC8D5 76%, #135C86 100%)
          `,
        }}
      />

      <div className="absolute inset-y-0 right-0 w-[30%] bg-[linear-gradient(270deg,rgba(5,39,73,0.62)_0%,rgba(10,78,117,0.34)_34%,rgba(15,116,142,0.12)_66%,transparent_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[18%] bg-[linear-gradient(90deg,rgba(10,61,95,0.20)_0%,rgba(20,117,139,0.08)_46%,transparent_100%)]" />

      <div className="absolute left-[-12%] top-[8%] h-[31rem] w-[77rem] rotate-[8deg] rounded-[50%] border border-white/36" />
      <div className="absolute left-[-8%] top-[40%] h-[28rem] w-[88rem] rotate-[7deg] rounded-[50%] border border-cyan-200/30" />
      <div className="absolute right-[-16%] bottom-[8%] h-[34rem] w-[78rem] -rotate-[10deg] rounded-[50%] border border-cyan-100/24" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hexStrokeDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8DEBFA" stopOpacity="0.78" />
            <stop offset="48%" stopColor="#2CC8E7" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0A6D9F" stopOpacity="0.92" />
          </linearGradient>

          <linearGradient id="hexFillDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#177AA7" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#062F56" stopOpacity="0.10" />
          </linearGradient>

          <filter
            id="softGlowDark"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="strongGlowDark"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.46">
          <polygon
            points="70,85 145,85 182,150 145,215 70,215 33,150"
            fill="none"
            stroke="url(#hexStrokeDark)"
            strokeWidth="2.0"
          />
          <polygon
            points="145,226 215,226 250,287 215,348 145,348 110,287"
            fill="url(#hexFillDark)"
            stroke="url(#hexStrokeDark)"
            strokeWidth="1.6"
          />
          <polygon
            points="32,368 100,368 134,427 100,486 32,486 -2,427"
            fill="none"
            stroke="url(#hexStrokeDark)"
            strokeWidth="1.5"
          />
          <polygon
            points="92,510 150,510 179,560 150,610 92,610 63,560"
            fill="none"
            stroke="url(#hexStrokeDark)"
            strokeWidth="1.25"
          />
        </g>

        <g opacity="0.16">
          <polygon
            points="420,250 470,250 495,293 470,336 420,336 395,293"
            fill="none"
            stroke="#4EC9E4"
            strokeWidth="1.15"
          />
          <polygon
            points="510,420 552,420 573,456 552,492 510,492 489,456"
            fill="none"
            stroke="#72D9EC"
            strokeWidth="1.0"
          />
          <polygon
            points="620,145 658,145 677,178 658,211 620,211 601,178"
            fill="none"
            stroke="#8DE5F2"
            strokeWidth="0.95"
          />
        </g>

        <g opacity="0.96">
          <polygon
            points="1110,72 1194,72 1236,145 1194,218 1110,218 1068,145"
            fill="url(#hexFillDark)"
            stroke="url(#hexStrokeDark)"
            strokeWidth="2.5"
            filter="url(#softGlowDark)"
          />
          <polygon
            points="1228,135 1300,135 1336,197 1300,259 1228,259 1192,197"
            fill="rgba(8,67,104,0.12)"
            stroke="#4ED9EF"
            strokeWidth="1.9"
          />
          <polygon
            points="1326,55 1394,55 1428,114 1394,173 1326,173 1292,114"
            fill="rgba(8,46,83,0.14)"
            stroke="#86E8F5"
            strokeWidth="1.5"
          />

          <polygon
            points="1175,250 1265,250 1310,328 1265,406 1175,406 1130,328"
            fill="rgba(6,65,103,0.18)"
            stroke="url(#hexStrokeDark)"
            strokeWidth="2.8"
            filter="url(#strongGlowDark)"
          />

          <polygon
            points="1290,300 1364,300 1401,364 1364,428 1290,428 1253,364"
            fill="rgba(6,44,79,0.10)"
            stroke="#36C9E6"
            strokeWidth="2.0"
          />
          <polygon
            points="1385,235 1445,235 1475,287 1445,339 1385,339 1355,287"
            fill="rgba(7,73,110,0.11)"
            stroke="#75DEEF"
            strokeWidth="1.45"
          />

          <polygon
            points="1085,438 1151,438 1184,495 1151,552 1085,552 1052,495"
            fill="rgba(8,52,88,0.08)"
            stroke="#48D1E9"
            strokeWidth="1.55"
          />
          <polygon
            points="1200,470 1286,470 1329,544 1286,618 1200,618 1157,544"
            fill="rgba(5,55,94,0.18)"
            stroke="#20B9D9"
            strokeWidth="2.1"
          />
          <polygon
            points="1330,518 1398,518 1432,577 1398,636 1330,636 1296,577"
            fill="rgba(6,47,82,0.10)"
            stroke="#80E3F1"
            strokeWidth="1.4"
          />

          <polygon
            points="1118,635 1180,635 1211,689 1180,743 1118,743 1087,689"
            fill="none"
            stroke="#4CCFE7"
            strokeWidth="1.45"
          />
          <polygon
            points="1256,665 1344,665 1388,741 1344,817 1256,817 1212,741"
            fill="rgba(6,59,98,0.16)"
            stroke="url(#hexStrokeDark)"
            strokeWidth="2.0"
          />
          <polygon
            points="1410,660 1466,660 1494,709 1466,758 1410,758 1382,709"
            fill="none"
            stroke="#8DEAF6"
            strokeWidth="1.25"
          />
        </g>

        <g opacity="0.36">
          <polygon
            points="890,120 936,120 959,160 936,200 890,200 867,160"
            fill="none"
            stroke="#5FD7EB"
            strokeWidth="1.1"
          />
          <polygon
            points="970,680 1015,680 1037,719 1015,758 970,758 948,719"
            fill="none"
            stroke="#58CCE3"
            strokeWidth="1.1"
          />
          <polygon
            points="1455,355 1508,355 1535,401 1508,447 1455,447 1428,401"
            fill="none"
            stroke="#27C0DE"
            strokeWidth="1.35"
          />
        </g>

        <g strokeLinecap="round" filter="url(#strongGlowDark)">
          <line
            x1="1133"
            y1="328"
            x2="1178"
            y2="250"
            stroke="#17D8F5"
            strokeWidth="3.7"
            opacity="0.90"
          />
          <line
            x1="1310"
            y1="328"
            x2="1265"
            y2="406"
            stroke="#43E4FB"
            strokeWidth="3.2"
            opacity="0.76"
          />
          <line
            x1="1212"
            y1="741"
            x2="1256"
            y2="665"
            stroke="#19CAE9"
            strokeWidth="3.1"
            opacity="0.72"
          />
          <line
            x1="1428"
            y1="114"
            x2="1394"
            y2="173"
            stroke="#69E3F5"
            strokeWidth="2.7"
            opacity="0.68"
          />
        </g>

        <g fill="#5BDEEF" opacity="0.50">
          <circle cx="1030" cy="120" r="2.1" />
          <circle cx="1010" cy="170" r="1.4" />
          <circle cx="1095" cy="220" r="1.7" />
          <circle cx="1400" cy="185" r="1.5" />
          <circle cx="1370" cy="455" r="1.8" />
          <circle cx="1450" cy="490" r="1.2" />
          <circle cx="1230" cy="650" r="1.6" />
          <circle cx="1320" cy="630" r="1.2" />
          <circle cx="1500" cy="710" r="1.5" />
        </g>
      </svg>

      <div
        className="absolute right-[-4%] top-[8%] h-[82%] w-[34%] rounded-[45%] blur-[100px]"
        style={{ backgroundColor: "rgba(11,91,134,0.18)" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.10)_0%,rgba(250,252,253,.42)_22%,rgba(248,251,252,.58)_50%,rgba(239,247,249,.30)_72%,rgba(7,65,103,.03)_100%)]" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      data-scroll-behavior="smooth"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('laztek-theme');if(p!=='dark'&&p!=='light')p='system';var t=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;document.documentElement.dataset.theme=t;document.documentElement.dataset.themePreference=p;document.documentElement.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='light';document.documentElement.dataset.themePreference='system'}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-[#EAF4F8]">
        <ScrollToTop />
        <a className="skip-link" href="#vsebina">
          Preskoči na vsebino
        </a>
        <LaztekBackground />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://laztek.si/#organization",
            name: "LazTek Engineering",
            url: "https://laztek.si",
            logo: "https://laztek.si/laztek-logo.png",
          }}
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
