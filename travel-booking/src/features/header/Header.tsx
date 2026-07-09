import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "../../shared/ui/Button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            TravelExplore
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#destinations"
            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
          >
            Destinations
          </a>
          <a
            href="#packages"
            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
          >
            Packages
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Button variant="primary">Book Now</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <a
              href="#destinations"
              className="text-sm font-medium text-slate-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </a>
            <a
              href="#packages"
              className="text-sm font-medium text-slate-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Packages
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-slate-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-2">
              <Button variant="primary" className="w-full">
                Book Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

