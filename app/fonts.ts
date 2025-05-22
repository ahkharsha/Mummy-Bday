// app/fonts.ts
import { Italianno, Poppins } from 'next/font/google'

export const italianno = Italianno({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italianno',
})

export const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})