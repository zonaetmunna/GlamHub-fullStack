"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // TODO: email service integration
      toast.success("Email sent successfully!");
      reset();
    } catch (error) {
      toast.error("Error sending email");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Panel */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Phone</p>
              <p className="text-sm text-gray-500">+880 1234 567 890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Email</p>
              <p className="text-sm text-gray-500">support@glamehub.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Location</p>
              <p className="text-sm text-gray-500">
                21 Glame St, Dhaka 1212, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register("email", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Your message"
                  {...register("message", { required: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    Message is required
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Embed Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Our Location
        </h3>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.900089470313!2d90.40714381538564!3d23.750903794676955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f02f36a2b9%3A0x33a94a6fcf44e02e!2sDhaka%20City!5e0!3m2!1sen!2sbd!4v1602003089587!5m2!1sen!2sbd"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* FAQ Teaser Section */}
      <div className="mt-20 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Need quick help?
        </h3>
        <p className="text-gray-600 mb-4">
          Visit our{" "}
          <a href="/faq" className="text-blue-600 underline">
            FAQ page
          </a>{" "}
          for common questions.
        </p>
      </div>
    </div>
  );
}
