import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-brown-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Image
              src="/images/mocha-logo-white.png"
              alt="Mocha Logo"
              width={140}
              height={50}
              className="h-10 w-auto object-contain mb-6"
            />
            <p className="text-beige-100 mb-6">
              Modern money transfers powered by blockchain technology. Send money instantly to Sierra Leone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-beige-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-beige-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-beige-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-beige-100 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-beige-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-beige-100 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-beige-100 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-beige-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-beige-100 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-beige-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-beige-100 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-beige-100 hover:text-white transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-beige-100 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">
              <Link
                href="https://wa.me/1234567890"
                className="flex items-center text-beige-100 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-beige-100 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Mocha. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-beige-100 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-beige-100 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-beige-100 hover:text-white text-sm transition-colors">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
