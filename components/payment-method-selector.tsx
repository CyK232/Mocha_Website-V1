"use client"

import { useState } from "react"
import { CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentMethodSelectorProps {
  amount: string
  currency: string
  onPaymentComplete: (method: string, transactionId: string) => void
  onPaymentCancel: () => void
  onPaymentError: (error: Error) => void
  senderName?: string
  senderNumber?: string
  recipientName?: string
  recipientNumber?: string
}

export default function PaymentMethodSelector({
  amount,
  currency,
  onPaymentComplete,
  onPaymentCancel,
  onPaymentError,
  senderName,
  senderNumber,
  recipientName,
  recipientNumber,
}: PaymentMethodSelectorProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a mock transaction ID
      const mockTransactionId = `mock-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`

      // Call the success callback
      onPaymentComplete("card", mockTransactionId)

      // NOTE: In a real implementation, you would call your backend API here
      // Example:
      // const response = await fetch("/api/payment/process", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     method: "card",
      //     amount,
      //     currency,
      //     senderName,
      //     senderNumber,
      //     recipientName,
      //     recipientNumber,
      //   }),
      // });
      // const result = await response.json();
      // if (result.success) {
      //   onPaymentComplete("card", result.transactionId);
      // } else {
      //   onPaymentError(new Error(result.error || "Payment failed"));
      // }
    } catch (error) {
      onPaymentError(error instanceof Error ? error : new Error("Payment processing failed"))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Payment Method</h3>
        <div className="flex flex-col items-center justify-between rounded-md border-2 border-primary-500 p-4">
          <CreditCard className="h-6 w-6 mb-3" />
          <span className="font-medium">Card Payment</span>
          <span className="text-xs text-gray-500 mt-1">Visa, Mastercard, etc.</span>
        </div>
      </div>

      <div className="pt-4">
        <Button
          className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            "Pay with Card"
          )}
        </Button>
      </div>
    </div>
  )
}
