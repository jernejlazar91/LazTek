import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import SiteFooter from '@/components/SiteFooter'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://laztek.si'),

  title: {
    default:
      'LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj',
    template: '%s | LazTek Engineering',
  },

  description:
    'Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje, 3D modeliranje, prototipizacija in izdelava funkcionalnih tehničnih delov.',

  keywords: [
    'LazTek',
    'LazTek Engineering',
    'industrijski 3D tisk',
    '3D tisk Slovenija',
    '3D skeniranje',
    'reverse engineering',
    'povratni inženiring',
    'konstruiranje',
    '3D modeliranje',
    'CAD modeliranje',
    'prototipizacija',
    'tehnični deli',
    '3D tisk PA6 CF',
    '3D tisk kompozitov',
    'velikoformatni 3D tisk',
  ],

  creator: 'LazTek Engineering',
  publisher: 'LazTek Engineering',

  openGraph: {
    type: 'website',
    locale: 'sl_SI',
    url: 'https://laztek.si',
    siteName: 'LazTek Engineering',

    title:
      'LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj',

    description:
      'Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje, 3D modeliranje in prototipizacija.',

    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'LazTek Engineering - Industrijski 3D tisk, 3D skeniranje in razvoj',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'LazTek Engineering | Industrijski 3D tisk, 3D skeniranje in razvoj',

    description:
      'Industrijski 3D tisk, 3D skeniranje, povratni inženiring, konstruiranje in prototipizacija.',

    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="sl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}