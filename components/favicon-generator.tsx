"use client"

import { useEffect } from "react"

export default function FaviconGenerator() {
  useEffect(() => {
    // Create a favicon link element if it doesn't exist
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }

    // Set the favicon to the Mocha logo
    link.href = "/images/mocha-logo-icon-transparent.png"
  }, [])

  return null
}
