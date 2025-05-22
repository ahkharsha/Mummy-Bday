// app/layout.tsx
import type { Metadata } from 'next'
import { italianno, poppins } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy 20th Disha!',
  description: 'A cosmic celebration',
  themeColor: '#000000'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${italianno.variable} ${poppins.variable}`}>
      <body className={`${poppins.className} bg-black text-white min-h-screen overflow-x-hidden`}>
        <div className="fixed inset-0 bg-gradient-to-b from-sky-900/10 to-purple-900/10" />
        {children}
      </body>
    </html>
  )
}