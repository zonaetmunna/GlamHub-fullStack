"use client";

export default function FAQ() {
  const faqData = [
    {
      category: "Cosmetics Products",
      items: [
        {
          question: "Are GlameHub cosmetics suitable for all skin types?",
          answer:
            "Yes, all our products are dermatologically tested and designed for all skin types including sensitive skin.",
        },
        {
          question: "Do your cosmetics contain harmful chemicals?",
          answer:
            "No, we use cruelty-free, paraben-free, and eco-friendly ingredients in all our cosmetics.",
        },
        {
          question: "How can I know which product suits me best?",
          answer:
            "Our product pages have skin-type recommendations. You can also contact us for personalized advice.",
        },
      ],
    },
    {
      category: "Parlor & Spa Treatments",
      items: [
        {
          question: "Do I need an appointment for parlor services?",
          answer:
            "Yes, we recommend booking in advance through our website or mobile app to ensure availability.",
        },
        {
          question: "Are your beauty therapists certified?",
          answer:
            "Absolutely! All our therapists are trained, certified, and experienced in their fields.",
        },
        {
          question: "What safety measures do you follow in treatments?",
          answer:
            "We follow strict hygiene protocols including sanitized equipment, disposable tools, and therapist gloves.",
        },
      ],
    },
    {
      category: "Payments & Orders",
      items: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept cards, mobile banking (bkash, nagad), and cash on delivery for selected regions.",
        },
        {
          question: "Can I return a product if I'm not satisfied?",
          answer:
            "Yes, we offer 7-day hassle-free returns on unused, sealed products. Contact support for help.",
        },
        {
          question: "Do you offer home service for spa or makeup?",
          answer:
            "Yes, we provide premium home beauty services in selected areas. You can schedule via our site.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Answers to the most common questions about our products, treatments,
          services, and support.
        </p>

        <div className="space-y-12">
          {faqData.map((section, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4 border-b border-blue-100 pb-2">
                {section.category}
              </h3>
              <div className="space-y-6">
                {section.items.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-20 text-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Still have questions?
          </h4>
          <p className="text-gray-600 mb-4">
            Reach out to our support team for any additional help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
