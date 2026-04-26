import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'IWENE - Résidences Premium en Tunisie',
  description: 'Découvrez des propriétés résidentielles de luxe en Tunisie. IWENE propose des maisons premium alliant design moderne et élégance intemporelle.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/iwene-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/iwene-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/iwene-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/images/iwene-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
