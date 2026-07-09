import { Quote } from "lucide-react";
import { mockTestimonials } from "../../data/mockData";
import { Card, CardContent } from "../ui/Card";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Travelers Say</h2>
          <p className="text-slate-600">
            Don't just take our word for it. Read about the unforgettable experiences of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative border-none shadow-md bg-white">
              <div className="absolute -top-4 -left-2 bg-primary-100 p-2 rounded-full">
                <Quote className="h-6 w-6 text-primary-600" />
              </div>
              <CardContent className="pt-10 pb-6 px-6">
                <p className="text-slate-700 italic mb-6 text-sm md:text-base">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name} 
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
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
