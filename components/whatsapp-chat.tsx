"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, User, Phone, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define the conversation steps
type Step = "welcome" | "senderNumber" | "senderName" | "receiverName" | "receiverNumber" | "confirmation" | "complete"

// Define the message structure
interface Message {
  id: string
  content: string
  sender: "bot" | "user"
  timestamp: Date
}

// Define the transaction data structure
interface TransactionData {
  senderNumber: string
  senderName: string
  amount: string
  currency: "USD" | "GBP" | "EUR"
  receiverName: string
  receiverNumber: string
}

interface WhatsAppChatProps {
  initialAmount?: string
  onFlipBack?: () => void
}

export default function WhatsAppChat({ initialAmount = "", onFlipBack }: WhatsAppChatProps) {
  // State for the chat interface
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [currentStep, setCurrentStep] = useState<Step>("welcome")
  const [transactionData, setTransactionData] = useState<Partial<TransactionData>>({
    amount: initialAmount || "",
    currency: "USD",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showButtons, setShowButtons] = useState(true)

  // Initialize the chat with a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: `👋 Hi there! I'll help you complete your transfer of $${initialAmount || "0.00"}. First, I need a few details. Would you like to continue?`,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [initialAmount])

  // Auto-scroll to the bottom of the chat and ensure buttons are visible
  useEffect(() => {
    // Short timeout to ensure DOM is updated
    const scrollTimeout = setTimeout(() => {
      if (chatContainerRef.current) {
        if (buttonsRef.current) {
          // Scroll to buttons but only within the chat container
          const chatContainer = chatContainerRef.current
          const buttons = buttonsRef.current

          // Calculate the position to scroll to
          const buttonPosition = buttons.offsetTop
          const containerHeight = chatContainer.clientHeight
          const scrollPosition = buttonPosition - containerHeight / 2 + buttons.clientHeight / 2

          // Scroll only the chat container
          chatContainer.scrollTop = scrollPosition
        } else if (messagesEndRef.current) {
          // Scroll to the end of messages but only within the chat container
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
      }
    }, 100)

    return () => clearTimeout(scrollTimeout)
  }, [messages, showButtons, currentStep])

  // Prevent page scrolling when interacting with the chat
  useEffect(() => {
    const preventPageScroll = (e: WheelEvent) => {
      // Check if the event target is within the chat container
      if (chatContainerRef.current && chatContainerRef.current.contains(e.target as Node)) {
        // If the chat is already at the top and trying to scroll up, or
        // at the bottom and trying to scroll down, prevent the event from bubbling
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current

        if ((scrollTop === 0 && e.deltaY < 0) || (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)) {
          e.preventDefault()
        }
      }
    }

    // Add the event listener with passive: false to allow preventDefault
    document.addEventListener("wheel", preventPageScroll, { passive: false })

    return () => {
      document.removeEventListener("wheel", preventPageScroll)
    }
  }, [])

  // Add a bot message
  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  // Add a user message and process the next step
  const addUserMessage = (content: string) => {
    // Temporarily hide buttons during transition
    setShowButtons(false)

    // Add the user message to the chat
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])

    // Process the user input based on the current step
    processUserInput(content)

    // Show buttons again after a short delay
    setTimeout(() => {
      setShowButtons(true)
    }, 300)
  }

  // Process user input and determine the next step
  const processUserInput = (userInput: string) => {
    switch (currentStep) {
      case "welcome":
        // Any response to welcome moves to asking for sender's number
        setTimeout(() => {
          addBotMessage("Great! To get started, please enter your WhatsApp number.")
          setCurrentStep("senderNumber")
        }, 300)
        break

      case "senderNumber":
        // Validate and store the sender's number
        if (isValidPhoneNumber(userInput)) {
          setTransactionData((prev) => ({ ...prev, senderNumber: userInput }))
          setTimeout(() => {
            addBotMessage("Thanks! Now, please enter your full name.")
            setCurrentStep("senderName")
          }, 300)
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid phone number. Please enter a valid WhatsApp number.")
          }, 300)
        }
        break

      case "senderName":
        // Store the sender's name
        setTransactionData((prev) => ({ ...prev, senderName: userInput }))
        setTimeout(() => {
          addBotMessage("Great! Now, please enter the recipient's full name.")
          setCurrentStep("receiverName")
        }, 300)
        break

      case "receiverName":
        // Store the receiver's name
        setTransactionData((prev) => ({ ...prev, receiverName: userInput }))
        setTimeout(() => {
          addBotMessage("Finally, please enter the recipient's WhatsApp number.")
          setCurrentStep("receiverNumber")
        }, 300)
        break

      case "receiverNumber":
        // Validate and store the receiver's number
        if (isValidPhoneNumber(userInput)) {
          setTransactionData((prev) => ({ ...prev, receiverNumber: userInput }))

          // Move to confirmation step
          setTimeout(() => {
            const data = {
              ...transactionData,
              receiverNumber: userInput,
            } as TransactionData

            const confirmationMessage = `
              Please confirm your transfer details:
              
              From: ${data.senderName} (${data.senderNumber})
              To: ${data.receiverName} (${data.receiverNumber})
              Amount: $${data.amount}
              
              Would you like to proceed with this transfer?
            `
            addBotMessage(confirmationMessage)
            setCurrentStep("confirmation")
          }, 300)
        } else {
          setTimeout(() => {
            addBotMessage("That doesn't look like a valid phone number. Please enter a valid WhatsApp number.")
          }, 300)
        }
        break

      case "confirmation":
        // Process the confirmation
        if (userInput.toLowerCase() === "confirm" || userInput.toLowerCase() === "yes") {
          setTimeout(() => {
            addBotMessage(
              `Great! Your money transfer of $${transactionData.amount} to ${transactionData.receiverName} has been initiated. You'll receive a confirmation on your WhatsApp number shortly.`,
            )
            setCurrentStep("complete")

            // Add option to start a new transfer
            setTimeout(() => {
              addBotMessage("Would you like to make another transfer?")
            }, 800)
          }, 300)
        } else if (userInput.toLowerCase() === "cancel" || userInput.toLowerCase() === "no") {
          setTimeout(() => {
            addBotMessage("Transfer cancelled. Would you like to start over?")
            setTransactionData({
              amount: initialAmount || "",
              currency: "USD",
            })
            setCurrentStep("welcome")
          }, 300)
        } else {
          setTimeout(() => {
            addBotMessage("Please confirm if you want to proceed with this transfer.")
          }, 300)
        }
        break

      case "complete":
        // Handle starting a new transfer
        if (userInput.toLowerCase() === "yes") {
          setTimeout(() => {
            addBotMessage("Great! Let's start a new transfer. Please enter your WhatsApp number.")
            setTransactionData({
              amount: initialAmount || "",
              currency: "USD",
            })
            setCurrentStep("senderNumber")
          }, 300)
        } else if (userInput.toLowerCase() === "no") {
          setTimeout(() => {
            addBotMessage("Thank you for using Mocha! If you need anything else, just let me know.")
          }, 300)
        } else {
          setTimeout(() => {
            addBotMessage("Would you like to make another transfer? Please reply with Yes or No.")
          }, 300)
        }
        break
    }
  }

  // Validate phone number (basic validation)
  const isValidPhoneNumber = (number: string) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = number.replace(/[\s\-()]/g, "")
    // Check if it's a valid number format (at least 10 digits)
    return /^\+?[0-9]{10,15}$/.test(cleaned)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (input.trim()) {
      addUserMessage(input)
      setInput("")

      // Keep focus on input without scrolling the page
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        activeElement.blur()
      }
    }

    return false
  }

  // Render welcome buttons
  const renderWelcomeButtons = () => {
    if (currentStep === "welcome" && showButtons) {
      return (
        <div ref={buttonsRef} className="flex justify-center gap-2 mb-4 mt-2 animate-fadeIn">
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("Yes, let's continue")
            }}
          >
            Yes, continue
          </Button>
          <Button
            variant="outline"
            className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("I need to change something")
            }}
          >
            Change details
          </Button>
        </div>
      )
    }
    return null
  }

  // Render confirmation buttons
  const renderConfirmationButtons = () => {
    if (currentStep === "confirmation" && showButtons) {
      return (
        <div ref={buttonsRef} className="flex justify-center gap-2 mb-4 mt-2 animate-fadeIn">
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("confirm")
            }}
          >
            Confirm Transfer
          </Button>
          <Button
            variant="outline"
            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("cancel")
            }}
          >
            Cancel
          </Button>
        </div>
      )
    }
    return null
  }

  // Render complete buttons
  const renderCompleteButtons = () => {
    if (currentStep === "complete" && showButtons) {
      return (
        <div ref={buttonsRef} className="flex justify-center gap-2 mb-4 mt-2 animate-fadeIn">
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("Yes")
            }}
          >
            Start another transaction
          </Button>
          <Button
            variant="outline"
            className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addUserMessage("No")
            }}
          >
            No
          </Button>
        </div>
      )
    }
    return null
  }

  // Render input field with appropriate icon based on current step
  const renderInputWithIcon = () => {
    let icon = <Send className="h-4 w-4" />
    let placeholder = "Type a message..."

    switch (currentStep) {
      case "senderNumber":
        icon = <Phone className="h-4 w-4" />
        placeholder = "Enter your WhatsApp number..."
        break
      case "senderName":
      case "receiverName":
        icon = <User className="h-4 w-4" />
        placeholder = "Enter name..."
        break
      case "receiverNumber":
        icon = <UserCheck className="h-4 w-4" />
        placeholder = "Enter recipient's WhatsApp number..."
        break
    }

    return (
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit(e)
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
        <Button
          type="button"
          className="bg-brown-300 hover:bg-brown-400 px-3"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit(e)
          }}
        >
          {icon}
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* WhatsApp Style Interface */}
      <div className="bg-brown-300 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <Send className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold">Complete Your Transfer</h3>
            <p className="text-xs text-white/80">Powered by Mocha</p>
          </div>
        </div>
        <button
          className="text-white hover:text-white/80 transition-colors"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onFlipBack) onFlipBack()
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

      {/* Chat area - with isolated scrolling */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 bg-gray-50 overflow-y-auto"
        style={{
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
          isolation: "isolate",
        }}
        onClick={(e) => e.stopPropagation()}
        onScroll={(e) => e.stopPropagation()}
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div
              className={`rounded-lg p-3 shadow-sm max-w-[80%] ${
                message.sender === "user" ? "bg-brown-100" : "bg-white"
              }`}
            >
              <p className="text-gray-800 whitespace-pre-line">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* Quick reply buttons for different steps */}
        {renderWelcomeButtons()}
        {renderConfirmationButtons()}
        {renderCompleteButtons()}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit(e)
          return false
        }}
        className="p-3 border-t bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {renderInputWithIcon()}
      </form>
    </div>
  )
}
