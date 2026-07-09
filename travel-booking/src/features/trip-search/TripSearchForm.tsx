import { useState } from "react";
import { Search, MapPin, Calendar, Users, AlertCircle } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";

export function TripSearchForm() {
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    guests: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error when user types
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.destination || !formData.date || !formData.guests) {
      setStatus("error");
      setErrorMessage("Please fill in all search fields.");
      return;
    }

    if (parseInt(formData.guests) < 1) {
      setStatus("error");
      setErrorMessage("Number of guests must be at least 1.");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Reset form after 3 seconds success message
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="relative -mt-32 z-20 container mx-auto px-4 max-w-5xl">
      <div className="glass rounded-3xl p-6 md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="w-full md:flex-1 space-y-2">
            <label htmlFor="destination" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-500" /> Destination
            </label>
            <Input
              id="destination"
              name="destination"
              placeholder="Where are you going?"
              value={formData.destination}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
              aria-invalid={status === "error"}
            />
          </div>

          <div className="w-full md:flex-1 space-y-2">
            <label htmlFor="date" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary-500" /> Date
            </label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
              aria-invalid={status === "error"}
            />
          </div>

          <div className="w-full md:flex-1 space-y-2">
            <label htmlFor="guests" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary-500" /> Guests
            </label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              placeholder="How many?"
              value={formData.guests}
              onChange={handleChange}
              disabled={status === "loading" || status === "success"}
              aria-invalid={status === "error"}
            />
          </div>

          <div className="w-full md:w-auto pt-2 md:pt-0">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full md:w-auto flex items-center gap-2"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Searching..." : status === "success" ? "Done!" : (
                <>
                  <Search className="h-5 w-5" /> Search
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Status Messages */}
        {status === "error" && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm animate-in fade-in duration-200" role="alert">
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
        {status === "success" && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm animate-in fade-in duration-200" role="status">
            Search criteria accepted! Redirecting to results...
          </div>
        )}
      </div>
    </div>
  );
}

