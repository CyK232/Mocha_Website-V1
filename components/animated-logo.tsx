"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedLogoProps {
  width?: number
  height?: number
  className?: string
}

export default function AnimatedLogo({ width = 180, height = 65, className = "h-12 w-auto" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <Image
          src="/images/mocha-logo-transparent.png"
          alt="Mocha Logo"
          width={width}
          height={height}
          className={className + " object-contain"}
          priority
        />
      </motion.div>
    </motion.div>
  )
}
