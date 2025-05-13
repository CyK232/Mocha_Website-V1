"use client"

import { useState, useEffect, useRef } from "react"
import { Send, ChevronDown, Search, X, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WhatsAppChat from "./whatsapp-chat"
import PaymentMethodSelector from "./payment-method-selector"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FlipCardProps {
  onFlip?: () => void
}

export default function FlipCard({ onFlip }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [amount, setAmount] = useState("")
  const [receivedAmount, setReceivedAmount] = useState("0.00")
  const [fee, setFee] = useState("0.00")
  const [currency, setCurrency] = useState("USD")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [demoMode, setDemoMode] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ code: "+1", flag: "🇺🇸", name: "United States" })
  const dialogRef = useRef<HTMLDivElement>(null)

  const [isCurrencyDialogOpen, setCurrencyDialogOpen] = useState(false)
  const currencyDialogRef = useRef<HTMLDivElement>(null)

  // Exchange rates
  const exchangeRates = {
    USD: 23.5,
    GBP: 29,
    EUR: 24,
  }

  // Fee percentage (1%)
  const feePercentage = 0.01

  // Calculate received amount when amount or currency changes
  useEffect(() => {
    if (amount && !isNaN(Number.parseFloat(amount))) {
      const amountValue = Number.parseFloat(amount)

      // Calculate fee (1% of the amount)
      const feeAmount = (amountValue * feePercentage).toFixed(2)
      setFee(feeAmount)

      // Calculate received amount based on currency
      const exchangeRate = exchangeRates[currency as keyof typeof exchangeRates] || 23.5
      const received = (amountValue * exchangeRate).toFixed(2)
      setReceivedAmount(received)
    } else {
      setReceivedAmount("0.00")
      setFee("0.00")
    }
  }, [amount, currency])

  // Handle clicking outside the dialog
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsDialogOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dialogRef])

  // Handle clicking outside the currency dialog
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyDialogRef.current && !currencyDialogRef.current.contains(event.target as Node)) {
        setCurrencyDialogOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [currencyDialogRef])

  const handleFlip = () => {
    // Validate that we have the required information
    if (!phoneNumber.trim()) {
      // If no phone number, don't flip
      return
    }

    // Show payment methods instead of flipping directly to WhatsApp chat
    setShowPaymentMethods(true)
    setIsFlipped(true)
    if (onFlip) onFlip()
  }

  const handlePaymentComplete = (method: string, transactionId: string) => {
    console.log(`Payment completed with ${method}, transaction ID: ${transactionId}`)
    // Hide payment methods and show WhatsApp chat
    setShowPaymentMethods(false)
  }

  const handlePaymentCancel = () => {
    console.log("Payment cancelled")
    // Flip back to the front of the card
    setIsFlipped(false)
    setShowPaymentMethods(false)
  }

  const handlePaymentError = (error: Error) => {
    console.error("Payment error:", error)
    // Show error message but stay on payment methods
    alert(`Payment error: ${error.message}`)
  }

  const openWhatsApp = () => {
    // Format the phone number by removing any non-digit characters except the plus sign
    const formattedNumber = selectedCountry.code + phoneNumber.replace(/[^\d]/g, "")

    // Create the message text
    const messageText = `Hello! I'd like to send ${currency} ${amount || "0.00"} (${receivedAmount} SLL) via Mocha.`

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber.replace("+", "")}?text=${encodeURIComponent(messageText)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  // Format the full phone number
  const getFormattedPhoneNumber = () => {
    return selectedCountry.code + phoneNumber.replace(/[^\d]/g, "")
  }

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={`relative transition-transform duration-700 transform-style-3d w-full h-[500px] ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl p-6 ${
            isFlipped ? "invisible" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-beige-100 flex items-center justify-center mr-3">
                <Send className="h-6 w-6 text-brown-400 rotate-45" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Send Money</h3>
                <p className="text-sm text-gray-600">Fast, secure transfers</p>
              </div>
            </div>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="text-sm text-brown-400 hover:text-brown-500 flex items-center"
            >
              {demoMode ? "Normal Mode" : "Demo Mode"}
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Amount to send</label>
            <div className="flex">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-r-none border-r-0"
              />
              <div className="relative">
                <button
                  type="button"
                  className="h-10 flex items-center border border-l-0 rounded-r-md px-3 bg-white"
                  onClick={() => setCurrencyDialogOpen(!isCurrencyDialogOpen)}
                >
                  <span className="mr-1">{currency}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isCurrencyDialogOpen && (
                  <div
                    ref={currencyDialogRef}
                    className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    {["USD", "GBP", "EUR"].map((curr) => (
                      <button
                        key={curr}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setCurrency(curr)
                          setCurrencyDialogOpen(false)
                        }}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">They'll receive</label>
            <div className="border rounded-md p-3 bg-gray-50">
              <span className="text-lg">{receivedAmount} SLL</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Your WhatsApp number</label>
            <div className="flex">
              <div className="relative">
                <button
                  type="button"
                  className="h-10 w-[100px] rounded-l-md border border-r-0 bg-white pl-2 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-brown-300 flex items-center justify-between"
                  onClick={() => setIsDialogOpen(!isDialogOpen)}
                >
                  <span>
                    {selectedCountry.flag} {selectedCountry.code}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isDialogOpen && (
                  <div
                    ref={dialogRef}
                    className="absolute top-full left-0 mt-1 w-64 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    <div className="sticky top-0 bg-white p-2 border-b">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          className="w-full pl-8 pr-2 py-1 border rounded-md text-sm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                        />
                        {searchTerm && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setSearchTerm("")}
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      {[
                        { code: "+1", flag: "🇺🇸", name: "United States" },
                        { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
                        { code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
                        { code: "+234", flag: "🇳🇬", name: "Nigeria" },
                        { code: "+233", flag: "🇬🇭", name: "Ghana" },
                        { code: "+27", flag: "🇿🇦", name: "South Africa" },
                        { code: "+254", flag: "🇰🇪", name: "Kenya" },
                        { code: "+49", flag: "🇩🇪", name: "Germany" },
                        { code: "+33", flag: "🇫🇷", name: "France" },
                        { code: "+86", flag: "🇨🇳", name: "China" },
                        { code: "+91", flag: "🇮🇳", name: "India" },
                        { code: "+81", flag: "🇯🇵", name: "Japan" },
                        { code: "+61", flag: "🇦🇺", name: "Australia" },
                        { code: "+55", flag: "🇧🇷", name: "Brazil" },
                        { code: "+52", flag: "🇲🇽", name: "Mexico" },
                        { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
                        { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
                        { code: "+65", flag: "🇸🇬", name: "Singapore" },
                        { code: "+7", flag: "🇷🇺", name: "Russia" },
                        { code: "+90", flag: "🇹🇷", name: "Turkey" },
                        { code: "+20", flag: "🇪🇬", name: "Egypt" },
                        { code: "+92", flag: "🇵🇰", name: "Pakistan" },
                        { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
                        { code: "+84", flag: "🇻🇳", name: "Vietnam" },
                        { code: "+62", flag: "🇮🇩", name: "Indonesia" },
                        { code: "+63", flag: "🇵🇭", name: "Philippines" },
                        { code: "+60", flag: "🇲🇾", name: "Malaysia" },
                        { code: "+66", flag: "🇹🇭", name: "Thailand" },
                        { code: "+82", flag: "🇰🇷", name: "South Korea" },
                        { code: "+39", flag: "🇮🇹", name: "Italy" },
                        { code: "+34", flag: "🇪🇸", name: "Spain" },
                        { code: "+31", flag: "🇳🇱", name: "Netherlands" },
                        { code: "+48", flag: "🇵🇱", name: "Poland" },
                        { code: "+46", flag: "🇸🇪", name: "Sweden" },
                        { code: "+41", flag: "🇨🇭", name: "Switzerland" },
                        { code: "+43", flag: "🇦🇹", name: "Austria" },
                        { code: "+32", flag: "🇧🇪", name: "Belgium" },
                        { code: "+351", flag: "🇵🇹", name: "Portugal" },
                        { code: "+30", flag: "🇬🇷", name: "Greece" },
                        { code: "+45", flag: "🇩🇰", name: "Denmark" },
                        { code: "+47", flag: "🇳🇴", name: "Norway" },
                        { code: "+358", flag: "🇫🇮", name: "Finland" },
                        { code: "+353", flag: "🇮🇪", name: "Ireland" },
                        { code: "+972", flag: "🇮🇱", name: "Israel" },
                        { code: "+380", flag: "🇺🇦", name: "Ukraine" },
                        { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
                        { code: "+36", flag: "🇭🇺", name: "Hungary" },
                        { code: "+40", flag: "🇷🇴", name: "Romania" },
                        {},
                        { code: "+40", flag: "🇷🇴", name: "Romania" },
                        { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
                        { code: "+30", flag: "🇬🇷", name: "Greece" },
                        // Add more countries as needed
                      ]
                        .filter(
                          (country) =>
                            country.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            country.code?.includes(searchTerm),
                        )
                        .map((country, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center"
                            onClick={() => {
                              setSelectedCountry(country)
                              setIsDialogOpen(false)
                            }}
                          >
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.name}</span>
                            <span className="ml-auto text-gray-500">{country.code}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <Input
                type="tel"
                placeholder="WhatsApp number"
                className="rounded-l-none flex-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  <span>Exchange Rates</span>
                  <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p>1 USD = Le 23.5</p>
                    <p>1 GBP = Le 29</p>
                    <p>1 EUR = Le 24</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  <span>
                    Fee = {fee} {currency}
                  </span>
                  <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">1% flat fee deducted from your card balance</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {demoMode ? (
            <div className="space-y-4">
              <Button
                className="w-full py-6 bg-green-600 hover:bg-green-700 text-white font-medium text-lg flex items-center justify-center"
                onClick={openWhatsApp}
                disabled={!phoneNumber}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Send Real WhatsApp Message
              </Button>
              <p className="text-center text-sm text-gray-600">This will open WhatsApp with a pre-filled message</p>
            </div>
          ) : (
            <Button
              className="w-full py-6 bg-brown-400 hover:bg-brown-500 text-white font-medium text-lg"
              onClick={handleFlip}
              disabled={!phoneNumber}
            >
              Transfer Now
            </Button>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">No hidden fees. Instant transfers.</p>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl overflow-hidden rotate-y-180 ${
            !isFlipped ? "invisible" : ""
          }`}
        >
          {showPaymentMethods ? (
            <div className="h-full flex flex-col">
              {/* Payment Methods Header */}
              <div className="bg-brown-300 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Complete Your Payment</h3>
                    <p className="text-xs text-white/80">Powered by Mocha</p>
                  </div>
                </div>
                <button
                  className="text-white hover:text-white/80 transition-colors"
                  onClick={() => {
                    setIsFlipped(false)
                    setShowPaymentMethods(false)
                  }}
                  aria-label="Go back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-left"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                </button>
              </div>

              {/* Payment Methods Content */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Transaction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">
                        {currency} {amount || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient gets:</span>
                      <span className="font-medium">SLL {receivedAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee (1%):</span>
                      <span className="font-medium">
                        {currency} {fee}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="text-gray-700 font-medium">Total:</span>
                      <span className="font-bold">
                        {currency} {(Number(amount || 0) + Number(fee)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <PaymentMethodSelector
                  amount={amount || "0.00"}
                  currency={currency}
                  onPaymentComplete={handlePaymentComplete}
                  onPaymentCancel={handlePaymentCancel}
                  onPaymentError={handlePaymentError}
                  senderName=""
                  senderNumber={getFormattedPhoneNumber()}
                  recipientName=""
                  recipientNumber=""
                />
              </div>
            </div>
          ) : (
            <WhatsAppChat
              initialAmount={amount}
              onFlipBack={() => setIsFlipped(false)}
              senderNumber={getFormattedPhoneNumber()}
              currency={currency}
              receivedAmount={receivedAmount}
            />
          )}
        </div>
      </div>
    </div>
  )
}
