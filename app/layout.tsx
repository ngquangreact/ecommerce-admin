import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import { ModalProvider } from '../providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';

import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce-admin-dashboard',
  description: 'Ecommerce-admin-dashboard description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
