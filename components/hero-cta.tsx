"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroCTA() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button variant="outline" className="text-lg py-6 px-8 group">
          Learn More
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  )
}
