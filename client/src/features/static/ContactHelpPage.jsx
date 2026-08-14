import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle } from "lucide-react";

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
      q: "How do I create a trip?",
      a: "Simply navigate to the Explore section, find your desired destination, and click 'Start Planning'. Our intuitive builder will guide you through the process step-by-step.",
    },
    {
      q: "How do I manage my journey?",
      a: "You can access all your upcoming and past journeys in your Account dashboard. From there, you can edit itineraries, add notes, track expenses, and invite travel companions.",
    },
    {
      q: "How do I explore destinations?",
      a: "Use our search functionality or browse our curated editorial collections. Each destination features comprehensive guides tailored to a slow, immersive travel experience.",
    },
    {
      q: "How do I update my profile?",
      a: "Navigate to 'Settings' within your Account menu to update personal details, security preferences, email address, and notification settings.",
    },
    {
      q: "Can I share my journey itinerary with others?",
      a: "Yes! In your trip overview, click 'Share Journey' to generate a secure, read-only link. Anyone with the link can view your itinerary, places, and packing tips.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FCF9F8] text-[#1C1B1B] min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[50vh] flex items-center px-4 sm:px-8 lg:px-16 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            alt="Scenic Rajasthan landscape"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AP1WRLtYlGQujR8-Cvy1dlld5Jy7JwKkUsxsuT-dWZeGGYXUc5d4HyHsILmlmxW49X4jvjTj9i1ST-z7Zl20tRanwaLv0_cTKeTkP2xPuuOOCmuBBfXUAZOG6H6BySKvPuk_87mT6fNB7qojgnu1-VM6Ps1hUUQZ6nO2LPjs0sNU6paMFzfT4Cx48rOW04qaGEqAUxid7gcvaOtqFNXnVeCMhR027Lo3KgBogPrChAJBG_Net1_yomF3srbOZMfB"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F8] via-[#FCF9F8]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6C2F00] block mb-3">
              ASSISTANCE & EDITORIAL CARE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#6C2F00] mb-4">
              How can we help?
            </h1>
            <p className="text-base sm:text-lg text-[#54433A] max-w-2xl leading-relaxed">
              Have a question about PackGo or your journey? We're here to help
              you craft an effortless and unforgettable travel experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CONTENT (FAQ + Editorial Form) ── */}
      <section className="px-4 sm:px-8 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: FAQ */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl font-bold text-[#6C2F00] mb-8 border-b border-[#DAC2B6]/40 pb-4">
              Help
            </h2>

            <div className="space-y-1 divide-y divide-[#DAC2B6]/30">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex justify-between items-center text-left group transition-colors"
                    >
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B1B] group-hover:text-[#6C2F00] transition-colors pr-4">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-[#877369] group-hover:text-[#6C2F00] transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pt-3 text-sm text-[#54433A] leading-relaxed font-sans animate-fade-in-up">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Contact */}
            <div className="mt-16 pt-8 border-t border-[#DAC2B6]/40">
              <h4 className="text-xs font-semibold text-[#877369] uppercase tracking-widest mb-2">
                Need direct help with your journey?
              </h4>
              <a
                className="font-serif text-2xl sm:text-3xl font-bold text-[#6C2F00] hover:text-[#8B4513] transition-colors inline-flex items-center gap-2"
                href="mailto:support@packgo.com"
              >
                support@packgo.com
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className="lg:col-span-6 relative">
            <div className="lg:sticky lg:top-32 bg-white/60 p-6 sm:p-10 rounded border border-[#DAC2B6]/30 shadow-xs">
              <h2 className="font-serif text-3xl font-bold text-[#6C2F00] mb-8 border-b border-[#DAC2B6]/40 pb-4">
                Send us a message
              </h2>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#CDEACE] text-[#2E4632] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1B1B]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-[#54433A] max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our concierge
                    team has received your note and will reply to{" "}
                    <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-6 px-8 py-3 bg-[#6C2F00] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#8B4513] transition-colors"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#877369] mb-1"
                      htmlFor="contact-name"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Ananya Sharma"
                      className="w-full bg-transparent border-b border-[#DAC2B6] py-3 text-base text-[#1C1B1B] placeholder-[#877369]/60 focus:outline-hidden focus:border-[#6C2F00] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#877369] mb-1"
                      htmlFor="contact-email"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. ananya@example.com"
                      className="w-full bg-transparent border-b border-[#DAC2B6] py-3 text-base text-[#1C1B1B] placeholder-[#877369]/60 focus:outline-hidden focus:border-[#6C2F00] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#877369] mb-1"
                      htmlFor="contact-subject"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Trip customization inquiry"
                      className="w-full bg-transparent border-b border-[#DAC2B6] py-3 text-base text-[#1C1B1B] placeholder-[#877369]/60 focus:outline-hidden focus:border-[#6C2F00] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-[#877369] mb-1"
                      htmlFor="contact-message"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="How can we assist your journey?"
                      className="w-full bg-transparent border-b border-[#DAC2B6] py-3 text-base text-[#1C1B1B] placeholder-[#877369]/60 focus:outline-hidden focus:border-[#6C2F00] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#1C1B1B] text-white px-10 py-4 rounded text-xs font-semibold uppercase tracking-widest hover:bg-[#6C2F00] transition-colors duration-300 inline-flex items-center justify-center gap-2 group"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FINAL CTA ── */}
      <section className="px-4 sm:px-8 lg:px-16 py-24 border-t border-[#DAC2B6]/20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#6C2F00]">
            Ready to keep exploring?
          </h2>
          <p className="text-sm sm:text-base text-[#54433A]">
            Discover extraordinary destinations across India and begin crafting
            your itinerary today.
          </p>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-[#1C1B1B] text-white px-10 py-4 rounded text-xs font-semibold uppercase tracking-widest hover:bg-[#6C2F00] transition-colors duration-300 group"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactHelpPage;
