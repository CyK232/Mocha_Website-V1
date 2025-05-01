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
              Send Money in Seconds
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Experience instant transfer from anywhere to Sierra Leone at the best rates. Send as little as $1 or as
              much as you need. Modern, secure, and blockchain-powered.
            </p>
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
