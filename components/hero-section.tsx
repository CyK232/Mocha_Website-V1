"use client"

import { useState } from "react"
import FlipCard from "./flip-card"
import HeroCTA from "./hero-cta"

export default function HeroSection() {
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-beige-100 to-beige-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Send Money to Sierra Leone
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Your Loved Ones Receive Money Directly on WhatsApp.
              <br />
              No middlemen. No hidden fees. Great rates and 24/7 instant transfers.
            </p>

            {/* Stats Section */}
            <div className="rounded-xl p-6 mb-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-brown-500">$2.1M</p>
                  <p className="text-sm text-gray-600">Cumulative Volume</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-brown-500">5819</p>
                  <p className="text-sm text-gray-600">Unique Transactions</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-brown-500">$750K</p>
                  <p className="text-sm text-gray-600">Remittance Volume</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-brown-500">$223</p>
                  <p className="text-sm text-gray-600">Average Transaction</p>
                </div>
              </div>
            </div>

            <HeroCTA />
          </div>

          <div className="max-w-md mx-auto w-full">
            <FlipCard onFlip={() => setIsCardFlipped(true)} />
          </div>
        </div>
      </div>
    </section>
  )
}
