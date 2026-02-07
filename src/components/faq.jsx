import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the AI resume analyzer work?",
      answer:
        "Our AI analyzes your resume format, keywords, content structure, and ATS compatibility, comparing it against thousands of successful resumes to provide actionable feedback.",
    },
    {
      question: "Is my resume data secure?",
      answer:
        "Absolutely! All uploaded resumes are encrypted and automatically deleted after 24 hours. We never share your data with third parties.",
    },
    {
      question: "What file formats are supported?",
      answer:
        "We currently support PDF format, which is the most widely accepted by ATS systems.",
    },
    {
      question: "How accurate is the ATS score?",
      answer:
        "Our scoring has a 95% correlation with actual ATS performance based on real-world feedback from users.",
    },
    {
      question: "Do I need to create an account?",
      answer: "Basic analysis is free without an account.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="py-20 bg-[#0F1F30]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-[#1E3A5F]/30 border border-[#2B5278] rounded-full text-sm font-medium text-[#3B9EFF]">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-[#3B9EFF] to-[#8B5CF6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#1A2B3D] border border-[#2B3F54] rounded-xl overflow-hidden hover:border-[#3B5F7F] transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1E3348] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      openIndex === idx
                        ? "bg-gradient-to-br from-[#3B9EFF] to-[#2563EB]"
                        : "bg-[#243647]"
                    }`}
                  >
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pl-20">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-[#1A2B3D] border border-[#2B3F54] rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-6">
            Ask me anything about how CareerCortex can help you land your dream
            job!
          </p>
          <a
            href="mailto:patelayush2578@gmail.com?subject=CareerCortex Support&body=Hi, I have a question about CareerCortex."
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#3B9EFF] to-[#2563EB] text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
           Mail Me Your Questions
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
