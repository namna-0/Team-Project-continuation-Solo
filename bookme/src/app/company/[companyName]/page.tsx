
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    description:
      "Traditional nail care with cuticle treatment, nail shaping, and polish application.",
    price: "$45",
    duration: "45 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    name: "Gel Manicure",
    description:
      "Long-lasting gel polish application with professional UV curing.",
    price: "$65",
    duration: "60 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    name: "Express Manicure",
    description:
      "For women on the move. Quick nail shaping with GEMINI Nourishing Nail Polish application.",
    price: "$35",
    duration: "30 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 4,
    name: "Luxury Pedicure",
    description:
      "Complete foot care treatment with exfoliation, massage, and premium polish.",
    price: "$75",
    duration: "75 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 5,
    name: "Nail Art Design",
    description:
      "Custom nail art creations by our skilled artists with premium materials.",
    price: "$85",
    duration: "90 min",
    image: "/api/placeholder/300/200",
  },
  {
    id: 6,
    name: "French Manicure",
    description:
      "Timeless French tips with precision application and long-lasting finish.",
    price: "$55",
    duration: "50 min",
    image: "/api/placeholder/300/200",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jessica Parker",
    text: "Absolutely incredible service! Bertie and her team always exceed my expectations. The attention to detail is phenomenal.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "Emma Thompson",
    text: "This upscale nail salon is my go-to place. The atmosphere is relaxing and the results are always perfect.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "Jennifer Walsh",
    text: "I've been coming here for years. The quality and consistency of their work is unmatched in the city.",
    rating: 5,
    image: "/api/placeholder/80/80",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState(""); 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
              >
                Nailsy
              </Link>
              
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="#home"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#services"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#about"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <Link
                href="#book"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                User
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md">
              <Link
                href="#home"
                className="block px-3 py-2 text-gray-700 hover:text-pink-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#services"
                className="block px-3 py-2 text-gray-700 hover:text-pink-500 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-pink-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="block px-3 py-2 text-gray-700 hover:text-pink-500 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#book"
                className="block mx-3 mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-pink-500 font-medium tracking-wider uppercase">
                  Premium Nail Care
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Luxury Nail
                  <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Experience
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Loved by celebs like Sarah Jessica Parker, this upscale nail
                  salon created by the one and only Bertie Capone herself is
                  incredible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#book"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 text-center font-semibold"
                >
                  Book Appointment
                </Link>
                <Link
                  href="#services"
                  className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-full hover:bg-pink-500 hover:text-white transition-all text-center font-semibold"
                >
                  View Services
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3+</div>
                  <div className="text-gray-600">Years</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/api/placeholder/600/700"
                  alt="Luxury nail salon"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>


      
      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/api/placeholder/600/500"
                alt="Bertie Capone"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">
                  About Us
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Meet Bertie Capone
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  With over a decade of experience in the beauty industry,
                  Bertie Capone has established herself as one of the premier
                  nail artists in the city. Her passion for perfection and eye
                  for detail have made her the go-to choice for celebrities and
                  discerning clients alike.
                </p>
                <p>
                  At Nailsy, we believe that nail care is an art form. Every
                  service is meticulously crafted to not only enhance your
                  natural beauty but to provide you with a luxurious experience
                  that rejuvenates both body and spirit.
                </p>
                <p>
                  Our commitment to excellence extends beyond just our services.
                  We use only the finest products, maintain the highest
                  standards of hygiene, and continuously stay updated with the
                  latest trends and techniques in nail care.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-500 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-2xl">
                  <div className="text-2xl font-bold text-pink-500 mb-2">
                    Celebrity
                  </div>
                  <div className="text-gray-600">Approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-current"
                        size={24}
                      />
                    )
                  )}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">Valued Client</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-pink-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest trends, tips, and
            exclusive offers from Nailsy.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-pink-500 px-8 py-4 rounded-r-full hover:bg-gray-50 transition-colors font-semibold"
              >
                Subscribe
              </button>
            </div>
            <p className="text-pink-100 text-sm mt-4">
              By subscribing, you agree to receive marketing messages at this
              email.
            </p>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-pink-500 font-medium tracking-wider uppercase mb-4">
              Contact Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to experience luxury nail care? Contact us to book your
              appointment or ask any questions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
              <MapPin className="text-pink-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                123 Beauty Avenue
                <br />
                New York, NY 10001
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
              <Phone className="text-pink-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
              <Mail className="text-pink-500 mx-auto mb-4" size={32} />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">hello@nailsy.com</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="#book"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 text-lg font-semibold inline-block"
            >
              Book Your Appointment Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Link
                href="/"
                className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 block"
              >
                Nailsy
              </Link>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Experience luxury nail care at its finest. Where
                celebrity-approved service meets exceptional artistry.
              </p>
              <div className="flex space-x-4">
                <Instagram
                  className="text-gray-400 hover:text-pink-400 cursor-pointer transition-colors"
                  size={24}
                />
                <Facebook
                  className="text-gray-400 hover:text-pink-400 cursor-pointer transition-colors"
                  size={24}
                />
                <Twitter
                  className="text-gray-400 hover:text-pink-400 cursor-pointer transition-colors"
                  size={24}
                />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#home"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-pink-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-pink-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Hours</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 9:00-19:00</li>
                <li>Saturday: 9:00-17:00</li>
                <li>Sunday: 11:00-16:00</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Nailsy. All rights reserved. Created with love by
              Bertie Capone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}