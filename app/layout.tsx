import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
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
  title: 'Ikram Kirmani — Cloud / DevOps Engineer',
  description:
    'Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation. Building infrastructure that scales.',
  keywords: ['Cloud Engineer', 'DevOps', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Infrastructure'],
  authors: [{ name: 'Syed Ikramuddin', url: 'https://ikramkirmanii.vercel.app' }],
  creator: 'Syed Ikramuddin',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ikramkirmanii.vercel.app',
    title: 'Ikram Kirmani — Cloud / DevOps Engineer',
    description: 'Cloud & DevOps Engineer. AWS · Kubernetes · Terraform · CI/CD.',
    siteName: 'Ikram Kirmani Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikram Kirmani — Cloud / DevOps Engineer',
    description: 'Cloud & DevOps Engineer. AWS · Kubernetes · Terraform · CI/CD.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
