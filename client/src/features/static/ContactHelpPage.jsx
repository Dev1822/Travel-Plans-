import React, { useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import {
  Mail,
  MessageSquare,
  ChevronDown,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export const ContactHelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does PackGo calculate trip budgets and expenses?",
      a: "PackGo lets you assign an overall planned budget to any trip. As you log expenses categorized by Food, Transportation, Accommodation, Activities, or Shopping, our summary engine aggregates totals by category and currency in real time.",
    },
    {
      q: "How does the packing list template feature work?",
      a: "You can load pre-populated templates for Beach, Business, or Camping trips with a single click. Items already on your list are never duplicated. You can toggle items as packed or clear the list whenever you wish.",
    },
    {
      q: "Can I share my journey itinerary with friends who don't have an account?",
      a: "Yes! In your trip overview, click 'Share Journey' to generate a secure, read-only link. Anyone with the link can view your itinerary, planned activities, and accommodation details without needing to sign up.",
    },
    {
      q: "How does the email verification and OTP change system operate?",
      a: "Upon registration, an activation link is sent to your inbox. If you ever update your email from the Profile & Settings page, we dispatch a 6-digit numeric OTP with a 5-minute validity and 60-second cooldown timer to verify your new address securely.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C2F00] mb-2 block">
            Support & Community
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B1B]">
            Contact & Help Center
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#54433A]">
            Have inquiries regarding itinerary planning, destination data, or
            account management? We're here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Accordion (Left column) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1B] mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-[#6C2F00]" />
              Frequently Answered Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E5E2E1] bg-[#FFFFFF] rounded overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-[#1C1B1B] hover:text-[#6C2F00] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#877369] transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#54433A] font-sans leading-relaxed border-t border-[#F0EDED] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Message Form (Right column) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#DAC2B6] rounded p-8 sm:p-10 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#1C1B1B] mb-2 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2.5 text-[#6C2F00]" />
              Send a Dispatch
            </h3>
            <p className="text-xs text-[#54433A] mb-6">
              Fill out the form below and our community team will reach out
              within 24 hours.
            </p>

            {submitted ? (
              <div className="text-center py-8 bg-[#CDEACE]/30 border border-[#B2CEB3] rounded p-6">
                <CheckCircle className="w-10 h-10 text-[#2E4632] mx-auto mb-3" />
                <h4 className="font-serif text-xl font-bold text-[#2E4632]">
                  Dispatch Received
                </h4>
                <p className="text-xs text-[#54433A] mt-2">
                  Thank you, {formData.name}. We have received your message and
                  will respond to <strong>{formData.email}</strong> shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label="Your Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Ananya Sharma"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. ananya@example.com"
                  required
                />

                <FormField
                  label="Topic / Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Suggestion for Rajasthan destinations"
                />

                <FormField
                  as="textarea"
                  label="Message / Inquiry"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your note here..."
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-4"
                >
                  Send Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHelpPage;
