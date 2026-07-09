import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setErrorMessage("Email address is required.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset form after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") setStatus("idle");
  };

  return (
    <section className="py-20 bg-primary-600 relative overflow-hidden" id="newsletter">
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary-700 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <Mail className="h-12 w-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Travel Updates & Deals
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter and be the first to know about exclusive packages and hidden gem destinations.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <label htmlFor="email-subscribe" className="sr-only">Email address</label>
              <Input
                id="email-subscribe"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                disabled={status === "loading" || status === "success"}
                aria-invalid={status === "error"}
                className="w-full bg-white/90 border-white/30 text-slate-900 placeholder:text-slate-500 focus:ring-primary-300 h-12"
              />
            </div>
            <Button 
              type="submit" 
              variant="secondary" 
              className="h-12 sm:w-auto w-full font-semibold"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>

          {/* Status Messages */}
          {status === "error" && (
            <div className="mt-4 p-3 bg-red-500/20 text-white rounded-md flex items-center justify-center gap-2 text-sm animate-in fade-in border border-red-500/30" role="alert">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMessage}</span>
            </div>
          )}
          {status === "success" && (
            <div className="mt-4 p-3 bg-green-500/20 text-white rounded-md flex items-center justify-center gap-2 text-sm animate-in fade-in border border-green-500/30" role="status">
              <CheckCircle className="h-4 w-4" />
              <span>Thank you! You've been successfully subscribed.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
