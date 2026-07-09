import { Shield, Map, Compass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../shared/ui/Card";

export function WhyChooseUs() {
  const features = [
    {
      title: "Trusted by Thousands",
      description: "Over 50,000 happy travelers have booked their dream vacations with us, leaving 5-star reviews across the board.",
      icon: <Shield className="h-10 w-10 text-primary-600 mb-4" />
    },
    {
      title: "Curated Experiences",
      description: "Every package is handpicked and verified by our travel experts to ensure you get the most authentic local experience.",
      icon: <Compass className="h-10 w-10 text-primary-600 mb-4" />
    },
    {
      title: "Global Destinations",
      description: "From the pristine beaches of Bali to the historic streets of Rome, we offer packages across 100+ countries.",
      icon: <Map className="h-10 w-10 text-primary-600 mb-4" />
    }
  ];

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-slate-50" id="why-choose-us">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose TravelExplore?</h2>
          <p className="text-slate-600">
            We take the hassle out of travel planning so you can focus on making memories. Here's why travelers love us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white text-center flex flex-col items-center p-4">
              <CardHeader className="items-center pb-4">
                <div className="bg-primary-50 p-4 rounded-full mb-4 shadow-inner">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


