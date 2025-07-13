"use client";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-sm mb-8 text-center">
          Last updated: July 2025
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to GlameHub. These Terms and Conditions outline the rules
              and regulations for the use of our website, services, and
              products. By accessing or using our site, you agree to comply with
              these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              2. Products & Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We offer a variety of cosmetics products and parlor/spa
              treatments. Product availability, pricing, and service offerings
              may change without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              3. User Responsibilities
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and up-to-date information.</li>
              <li>Respect our content usage policies.</li>
              <li>Do not misuse or interfere with the service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              4. Booking & Cancellation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All parlor service bookings must be made in advance. Cancellation
              should be done at least 24 hours before the appointment. Failure
              to do so may result in service charges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              5. Return & Refund Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Products can be returned within 7 days if unused and in original
              packaging. For service-related concerns, please contact our
              support team.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              6. Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We value your privacy. All personal data is protected and only
              used in accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              7. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              GlameHub may revise these terms from time to time. Changes will be
              posted on this page and are effective immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              8. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For any questions about our terms, please contact us via our{" "}
              <a
                href="/contact"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Contact Page
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
