import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockFAQs } from "./data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">
            Have questions about booking or traveling with us? We've got answers.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {mockFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div 
                variants={itemVariants}
                key={faq.id} 
                className={`rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border ${isOpen ? 'border-primary-200 bg-primary-50/30' : 'border-slate-100 bg-white'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={`text-lg font-bold ${isOpen ? 'text-primary-700' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-primary-100' : 'bg-slate-50'}`}>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      id={`faq-answer-${faq.id}`}
                      className="px-6 overflow-hidden"
                    >
                      <div className="pb-6 pt-0 text-slate-600 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}




