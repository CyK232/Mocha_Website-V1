import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7A6256", // Primary brown
          50: "#F5F3E9", // Lightest primary shade
          100: "#E0DCBD", // Light primary shade
          200: "#DED8D5", // Light primary shade
          300: "#BDB1AB", // Medium primary shade
          400: "#9B8980", // Medium primary shade
          500: "#7A6256", // Primary brown
          600: "#593B2C", // Darker primary shade
          700: "#472F23", // Darker primary shade
          800: "#35231A", // Very dark primary shade
          900: "#241812", // Very dark primary shade
          950: "#120C09", // Darkest primary shade
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#D5D1A7", // Secondary beige
          50: "#F8FFF8", // Lightest secondary shade
          100: "#F0FFF2", // Light secondary shade
          200: "#E9FFEB", // Light secondary shade
          300: "#E1FFE5", // Medium secondary shade
          400: "#DAFFDE", // Medium secondary shade
          500: "#D5D1A7", // Secondary beige
          600: "#CBC591", // Darker secondary shade
          700: "#A29E74", // Darker secondary shade
          800: "#7A7657", // Very dark secondary shade
          900: "#514F3A", // Very dark secondary shade
          950: "#2C332C", // Darkest secondary shade
          foreground: "#120C09",
        },
        accent: {
          DEFAULT: "#3C5155", // Accent teal
          light: "#CED4D5", // Light accent
          dark: "#091E22", // Dark accent
          50: "#F8FFFF", // Lightest accent shade
          100: "#DAFFDE", // Light accent shade
          200: "#AECCB2", // Light accent shade
          300: "#839985", // Medium accent shade
          400: "#576659", // Medium accent shade
          500: "#3C5155", // Accent teal
          600: "#0B262B", // Darker accent shade
          700: "#091E22", // Darker accent shade
          800: "#040F11", // Very dark accent shade
          900: "#020809", // Very dark accent shade
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#DED8D5", // Light brown/beige
          foreground: "#593B2C", // Dark brown
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brown: {
          50: "#DED8D5",
          100: "#BDB1AB",
          200: "#9B8980",
          300: "#7A6256",
          400: "#593B2C",
          500: "#472F23",
          600: "#35231A",
          700: "#241812",
          800: "#120C09",
          900: "#020202",
        },
        beige: {
          50: "#F5F3E9",
          100: "#E0DCBD",
          200: "#D5D1A7",
          300: "#CBC591",
          400: "#A29E74",
          500: "#7A7657",
          600: "#514F3A",
          700: "#2C332C",
          800: "#1F2420",
          900: "#121512",
        },
        teal: {
          50: "#CED4D5",
          100: "#9DA8AA",
          200: "#6D7D80",
          300: "#3C5155",
          400: "#0B262B",
          500: "#091E22",
          600: "#040F11",
          700: "#020809",
          800: "#010404",
          900: "#000000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
