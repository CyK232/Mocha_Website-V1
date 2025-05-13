import Image from "next/image"
import { CheckCircle2, Wallet, Users, CheckCheck } from "lucide-react"

export default function AboutSection() {
  const steps = [
    {
      number: "1",
      title: "Fund Wallet",
      description: "Securely add funds to your wallet using your preferred payment method.",
      icon: <Wallet className="h-6 w-6 text-white" />,
    },
    {
      number: "2",
      title: "Add Recipient",
      description: "Easily add whatsapp contact of receiver",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      number: "3",
      title: "Money Sent",
      description: "Your money arrives instantly to your recipient's WhatsApp. Fast, secure, and convenient.",
      icon: <CheckCheck className="h-6 w-6 text-white" />,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Mocha Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sending money to Sierra Leone has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-beige-100 flex items-center justify-center">
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Mocha?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Mocha combines the best of traditional finance with modern blockchain technology to provide a seamless
                money transfer experience.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-7 w-7 text-brown-300 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Micro Transactions</h4>
                    <p className="text-gray-600">
                      Send any amount you want, no matter how small. From $1 to larger sums, we handle all transaction
                      sizes with the same efficiency.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-brown-300 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Lower Fees</h4>
                    <p className="text-gray-600">
                      Save up to 80% on fees compared to traditional money transfer services and banks.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-brown-300 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Fast Transfers</h4>
                    <p className="text-gray-600">Money arrives in seconds, not days or hours</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-brown-300 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Secure & Reliable</h4>
                    <p className="text-gray-600">End-to-end encryption and blockchain security</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-brown-300 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Easy to Use</h4>
                    <p className="text-gray-600">
                      Simple interface designed for seamless transfers, even for first-time users.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              <Image
                src="/images/mocha-whatsapp-interface.png"
                alt="Mocha WhatsApp Interface"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
