export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const mockFAQs: FAQ[] = [
  {
    id: "f1",
    question: "Do you offer travel insurance?",
    answer: "Yes, comprehensive travel insurance is available as an add-on during the checkout process for all our packages.",
  },
  {
    id: "f2",
    question: "Can I customize a travel package?",
    answer: "Absolutely! Our travel experts can help you tailor any existing package to better suit your preferences and dates.",
  },
  {
    id: "f3",
    question: "What is your cancellation policy?",
    answer: "You can cancel for a full refund up to 30 days before departure. Cancellations within 30 days are subject to a fee.",
  },
  {
    id: "f4",
    question: "Are flights included in the packages?",
    answer: "Most of our standard packages do not include international flights to allow you flexibility, but we can book them for you upon request.",
  }
];
