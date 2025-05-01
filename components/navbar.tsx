"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import AnimatedLogo from "./animated-logo"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-beige-100 backdrop-blur-sm border-b border-beige-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <AnimatedLogo />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="font-medium">
            About
          </Button>
          <Button className="bg-brown-300 hover:bg-brown-400 text-white font-medium">Contact Support</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link href="#how-it-works" className="text-gray-700 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="#features" className="text-gray-700 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link href="#about" className="text-gray-700 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="#faq" className="text-gray-700 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" className="w-full justify-center font-medium">
                About
              </Button>
              <Button className="w-full justify-center bg-brown-300 hover:bg-brown-400 text-white font-medium">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
