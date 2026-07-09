import { Plane, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Plane className="h-6 w-6 text-primary-500" />
            <span className="text-xl font-bold tracking-tight">
              TravelExplore
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Discover the world's most amazing destinations with curated travel
            experiences. Your next adventure starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#destinations" className="hover:text-primary-400 transition-colors">
                Destinations
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-primary-400 transition-colors">
                Travel Packages
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-primary-400 transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-primary-400 transition-colors">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
        &copy; {new Date().getFullYear()} TravelExplore. All rights reserved.
      </div>
    </footer>
  );
}
