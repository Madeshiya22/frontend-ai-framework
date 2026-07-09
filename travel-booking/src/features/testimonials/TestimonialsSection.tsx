import { Quote } from "lucide-react";
import { mockTestimonials } from "./data";
import { Card, CardContent } from "../../shared/ui/Card";

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">What Our Travelers Say</h2>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Don't just take our word for it. Read about the unforgettable experiences of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full shadow-lg shadow-primary-500/30">
                <Quote className="h-6 w-6 text-white" />
              </div>
              <CardContent className="pt-12 pb-8 px-8">
                <p className="text-slate-300 italic mb-8 text-lg font-medium leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary-500 rounded-full blur opacity-40"></div>
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      loading="lazy"
                      className="relative h-14 w-14 rounded-full object-cover border-2 border-slate-800"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-primary-400 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}



