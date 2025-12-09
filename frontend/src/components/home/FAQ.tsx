"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqs = [
  {
    question: "How does authentication work?",
    answer:
      "We use industry-standard OAuth 2.0 and JWT tokens for secure authentication. Your credentials are never stored on our servers.",
  },
  {
    question: "Will the chatbot use my latest document changes?",
    answer:
      "Yes, our system pulls the latest version of your documents in real-time. Changes are reflected immediately in your chatbot.",
  },
  {
    question: "Can I have multiple chatbots for different products?",
    answer:
      "You can create unlimited chatbots, each with its own configuration, knowledge base, and customization settings.",
  },
];

const FAQ = () => {
  return (
    <section className="border-border/40 border-t py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-6 text-balance text-center text-4xl font-bold md:text-5xl">
          Have questions?
        </h2>
        <p className="text-muted-foreground mb-12 text-center">
          Let&apos;s quickly answer your most frequently asked questions
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border-border/40 data-[state=open]:bg-card/50 data-[state=open]:border-primary/30 rounded-lg border px-4 transition-all"
            >
              <AccordionTrigger className="text-foreground hover:text-primary py-4 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
