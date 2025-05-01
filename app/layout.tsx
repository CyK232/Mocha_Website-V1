import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FaviconGenerator from "@/components/favicon-generator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mocha - Send and receive money in seconds",
  description: "Experience instant transfers from anywhere to Sierra Leone at the best rates.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <FaviconGenerator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
