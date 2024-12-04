import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { SupabaseProvider } from '@/components/providers/supabase-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TimeShare',
  description: 'Share and view local times with friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <main className="min-h-screen">
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
