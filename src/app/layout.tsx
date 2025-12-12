import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Suredoor International - Centre for Research and Rehabilitation',
  description: 'A humanitarian body dedicated to restoring the dignity of man through socio-cultural programmes aimed at redirecting members of the public from destructive paths to purpose living.',
  keywords: ['NGO', 'charity', 'humanitarian', 'Nigeria', 'youth development', 'women empowerment', 'public enlightenment'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
