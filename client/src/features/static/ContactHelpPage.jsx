import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

export const ContactHelpPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create a trip?",
      answer:
        "Simply navigate to the Explore section, find your desired destination, and click 'Plan This Journey'. Our intuitive itinerary builder will guide you through setting dates, allocating your budget, and choosing points of interest step-by-step.",
    },
    {
      category: "Trips",
      question: "How do I manage my journey?",
      answer:
        "You can access all your upcoming, ongoing, and past journeys in your 'My Journey' dashboard. From there, you can customize daily itineraries, record itemized travel expenses, track packing checklists, view live weather, and generate public sharing links.",
    },
    {
      category: "Destinations",
      question: "How do I explore destinations?",
      answer:
        "Use our top search bar or browse curated regional collections across North, South, West, East, and Central India. Each destination features traveler dossiers including best seasons to visit, estimated entrance fees, DSLR camera rules, and key historic landmarks.",
    },
    {
      category: "Account",
      question: "How do I update my profile?",
      answer:
        "Navigate to 'Profile & Settings' from the user menu to update your traveler name, change your password, or request an email address update protected by 2-factor OTP verification.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="bg-[#FCF9F8] text-[#1C1B1B] min-h-screen">
      {/* ── 1. HERO SECTION (Rajasthan Desert Horizon) ── */}
      <section className="relative min-h-[58vh] flex items-center px-4 sm:px-8 lg:px-16 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLtYlGQujR8-Cvy1dlld5Jy7JwKkUsxsuT-dWZeGGYXUc5d4HyHsILmlmxW49X4jvjTj9i1ST-z7Zl20tRanwaLv0_cTKeTkP2xPuuOOCmuBBfXUAZOG6H6BySKvPuk_87mT6fNB7qojgnu1-VM6Ps1hUUQZ6nO2LPjs0sNU6paMFzfT4Cx48rOW04qaGEqAUxid7gcvaOtqFNXnVeCMhR027Lo3KgBogPrChAJBG_Net1_yomF3srbOZMfB"
            alt="Rajasthan desert road fading into horizon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F8] via-[#FCF9F8]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C2F00] block">
              Concierge & Guidance
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#6C2F00] leading-tight">
              How can we help?
            </h1>
            <p className="text-sm sm:text-lg text-[#54433A] max-w-2xl font-normal leading-relaxed">
              Have a question about PackGo or your journey? We're here to assist
              you at every step of your expedition.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT (FAQ & Contact Form) ── */}
      <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: FAQ Accordion */}
          <div className="md:col-span-6 space-y-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6C2F00] pb-4 border-b border-[#DAC2B6]/40">
                Help & FAQs
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-[#DAC2B6]/30">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="pt-6 first:pt-0 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center group py-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#877369] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#1C1B1B] group-hover:text-[#6C2F00] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#877369] group-hover:text-[#6C2F00] transition-transform duration-300 shrink-0 ml-4 ${
                        openFaq === idx ? "rotate-180 text-[#6C2F00]" : ""
                      }`}
                    />
                  </div>

                  {openFaq === idx && (
                    <div className="pt-3 pb-4 text-xs sm:text-sm text-[#54433A] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Direct Email Link */}
            <div className="pt-10 border-t border-[#DAC2B6]/40 space-y-2">
              <h4 className="text-[11px] font-semibold text-[#877369] uppercase tracking-widest">
                Need direct help with your journey?
              </h4>
              <a
                href="mailto:support@packgo.com"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#6C2F00] hover:text-[#8B4513] transition-colors inline-flex items-center gap-2"
              >
                <span>support@packgo.com</span>
                <ArrowUpRight className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Column: Send Us A Message Form */}
          <div className="md:col-span-6">
            <div className="sticky top-28 bg-[#FFFFFF] p-8 sm:p-10 border border-[#DAC2B6]/50 rounded-md shadow-xs space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-[#6C2F00] pb-4 border-b border-[#DAC2B6]/40">
                  Send us a message
                </h2>
                <p className="text-xs text-[#54433A] mt-2">
                  Drop us an inquiry and our travel curation team will get back
                  to you within 24 hours.
                </p>
              </div>

              {submitted && (
                <div className="p-4 bg-[#CDEACE]/50 border border-[#2E4632]/20 rounded text-xs text-[#2E4632] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! Your inquiry has been received.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#877369] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Vikramaditya Singh"
                    className="w-full bg-transparent border-b border-[#DAC2B6] focus:border-[#6C2F00] py-2 text-sm text-[#1C1B1B] placeholder-[#877369]/70 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#877369] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. vikram@example.com"
                    className="w-full bg-transparent border-b border-[#DAC2B6] focus:border-[#6C2F00] py-2 text-sm text-[#1C1B1B] placeholder-[#877369]/70 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#877369] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Question regarding Udaipur heritage pass"
                    className="w-full bg-transparent border-b border-[#DAC2B6] focus:border-[#6C2F00] py-2 text-sm text-[#1C1B1B] placeholder-[#877369]/70 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#877369] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="How can we assist your travel planning?"
                    className="w-full bg-transparent border-b border-[#DAC2B6] focus:border-[#6C2F00] py-2 text-sm text-[#1C1B1B] placeholder-[#877369]/70 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#1C1B1B] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#6C2F00] transition-all flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FINAL CTA ── */}
      <section className="px-4 sm:px-8 lg:px-16 py-20 border-t border-[#DAC2B6]/30 text-center bg-[#F6F3F2]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6C2F00]">
            Ready to keep exploring?
          </h2>
          <div>
            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 bg-[#1C1B1B] text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] rounded hover:bg-[#6C2F00] transition-colors shadow-md"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactHelpPage;
