import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      

      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-xl">+</div>
              </div>
              <span className="text-2xl font-bold">Vicodin</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is dummy text of
              the printing.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-400">Brooklyn, New York, United States</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-400">+0123-456789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-400">example@example.com</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-emerald-600 cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-emerald-600 cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-emerald-600 cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-emerald-600 cursor-pointer" />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Locations Map
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Order tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Wish List
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  My account
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-600">
                  Promotional Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-6">Subscribe to our weekly Newsletter and receive updates via email.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email*"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button className="bg-emerald-600 px-4 py-3 rounded-r-lg hover:bg-emerald-700">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 mb-4">We Accept</p>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-xs text-white">
                  PayPal
                </div>
                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-xs text-white">
                  Visa
                </div>
                <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-xs text-white">
                  MC
                </div>
                <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center text-xs text-white">
                  Amex
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">All Rights Reserved © Company 2025</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-600 text-sm">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-600 text-sm">
              Claim
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-600 text-sm">
              Privacy & Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
