import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockFAQs } from "../../data/mockData";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">
            Have questions about booking or traveling with us? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {mockFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-lg transition-colors ${isOpen ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200 bg-white'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={`font-semibold ${isOpen ? 'text-primary-700' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <div 
                    id={`faq-answer-${faq.id}`}
                    className="p-5 pt-0 text-slate-600 animate-in slide-in-from-top-2 fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
