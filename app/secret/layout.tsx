// app/secret/layout.tsx (new file)
import { redirect } from 'next/navigation'

export default function SecretLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (typeof window !== 'undefined' && !sessionStorage.getItem('secretAuth')) {
    redirect('/')
  }

  return <>{children}</>
}