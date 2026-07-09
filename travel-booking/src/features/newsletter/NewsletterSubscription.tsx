import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";

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
    <section className="py-12 md:py-20 lg:py-24 bg-slate-950 relative overflow-hidden" id="newsletter">
      {/* Premium Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600 rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-600 rounded-full blur-[100px] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-slate-900/50 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-16 border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-8 border border-primary-500/20">
            <Mail className="h-10 w-10 text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Get Travel Updates & Deals
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
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


