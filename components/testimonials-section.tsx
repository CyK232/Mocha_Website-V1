import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "James Koroma",
      role: "Diaspora Sender",
      content:
        "Sending money home is now quick and affordable. My family receives funds directly on WhatsApp - no more waiting in lines!",
      avatar: "/placeholder.svg?key=5lnwm",
      rating: 5,
    },
    {
      name: "Fatmata Sesay",
      role: "Content Creator",
      content:
        "I receive international payments at the best rates without losing money to unfair exchanges. A game-changer for my business!",
      avatar: "/professional-african-woman.png",
      rating: 5,
    },
    {
      name: "Ibrahim Kamara",
      role: "University Student",
      content:
        "My allowance goes straight to my whatsapp account instantly. No bank visits needed - I cashout when I want!",
      avatar: "/placeholder.svg?key=fayxs",
      rating: 5,
    },
  ]

  const partners = [
    {
      name: "CF",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CF.jpg-ualvWCExnRIhWwk9nKzBlxcZkyDQRZ.jpeg",
    },
    {
      name: "New Dacaf",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Dacaf.jpg-lHFLxkM2bTBJsrnJMcEgcTZASNUufH.jpeg",
    },
    {
      name: "Felei TechCity",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/felei.jpg-dByCBOlocokZdDWPjV6i7PxhNjKOiA.jpeg",
    },
    {
      name: "Ministry of Communication, Technology & Innovation",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MOCTI.jpg-L1pwUrvnsc1PRuchLFfZXN3TPNNjsz.jpeg",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust Mocha for their money transfer needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-beige-50 p-6 rounded-xl border border-beige-200 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-brown-500 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-brown-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-xl font-medium text-center text-brown-400 mb-8">Trusted By</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
