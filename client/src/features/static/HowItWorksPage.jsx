import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import {
  Compass,
  MapPin,
  Calendar,
  CheckSquare,
  DollarSign,
  CloudSun,
  Languages,
  Share2,
  ArrowRight,
} from "lucide-react";

export const HowItWorksPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: "01",
      title: "Discover Indian Heritage",
      eyebrow: "Step 1",
      description:
        "Browse an exhaustive collection of monuments, forts, temples, scenic hill stations, and coastal retreats across all regions of India with verified details.",
      icon: Compass,
      bgColor: "bg-[#FFDBC9]",
      iconColor: "text-[#6C2F00]",
    },
    {
      step: "02",
      title: "Deep-Dive Destination Details",
      eyebrow: "Step 2",
      description:
        "Access critical travel information: optimal season to visit, entrance fees in INR, operating hours, camera policies, and historical significance.",
      icon: MapPin,
      bgColor: "bg-[#CDEACE]",
      iconColor: "text-[#2E4632]",
    },
    {
      step: "03",
      title: "Plan Your Journey & Budget",
      eyebrow: "Step 3",
      description:
        "Set your departure and return dates, allocate a target budget, and build daily activity itineraries. Trips automatically sync with relevant destination imagery.",
      icon: Calendar,
      bgColor: "bg-[#FFDCBD]",
      iconColor: "text-[#5B3912]",
    },
    {
      step: "04",
      title: "Manage Expenses & Packing On-The-Go",
      eyebrow: "Step 4",
      description:
        "Track expenses categorized by food, accommodation, travel, and shopping. Build personalized packing lists using preset templates (Beach, Business, Camping).",
      icon: CheckSquare,
      bgColor: "bg-[#F0EDED]",
      iconColor: "text-[#1C1B1B]",
    },
  ];

  const features = [
    {
      icon: DollarSign,
      title: "Expense Breakdown",
      desc: "Categorize every rupee spent and see real-time charts against your planned budget.",
    },
    {
      icon: CheckSquare,
      title: "Intelligent Packing Lists",
      desc: "Categorized packing checklists with one-click preset templates and item toggling.",
    },
    {
      icon: CloudSun,
      title: "Live Weather Forecast",
      desc: "5-day meteorological forecasts to pack the right clothing and choose the best days for excursions.",
    },
    {
      icon: Languages,
      title: "28-Language Translator",
      desc: "Translate phrases between English, Hindi, Tamil, Telugu, Bengali, Marathi, and global languages.",
    },
    {
      icon: Share2,
      title: "Public Journey Sharing",
      desc: "Generate clean, read-only share links for your travel companions without requiring an account.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C2F00] mb-2 block">
            The PackGo Methodology
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1B1B] leading-tight">
            How PackGo Transforms Your Travel
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#54433A] leading-relaxed">
            From initial inspiration to packing your bags and recording
            memories, discover how our intentional platform supports every stage
            of your Indian odyssey.
          </p>
        </div>

        {/* 4-Step Editorial Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2E1] rounded-md shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl font-extrabold text-[#DAC2B6]">
                      {item.step}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center ${item.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6C2F00] mb-1 block">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1B1B] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#54433A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Grid */}
        <div className="pt-16 border-t border-[#E5E2E1] mb-24">
          <SectionHeading
            align="center"
            eyebrow="Built-in Utilities"
            title="Everything You Need in One Sanctuary"
            subtitle="Thoughtfully engineered tools to keep your journeys organized and effortless."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#FFFFFF] border border-[#E5E2E1] rounded transition-all hover:border-[#DAC2B6]"
                >
                  <div className="w-10 h-10 rounded bg-[#FFDBC9] text-[#6C2F00] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1C1B1B] mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#54433A] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-[#1C1B1B] text-[#FCF9F8] rounded-md p-10 sm:p-16 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Ready to Begin Your Next Journey?
          </h2>
          <p className="text-sm sm:text-base text-[#DAC2B6] max-w-xl mx-auto mb-8">
            Create an account in seconds to start building custom itineraries,
            tracking your travel expenses, and sharing plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="terracotta"
              size="lg"
              onClick={() => navigate("/register")}
            >
              Get Started for Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-[#DAC2B6] hover:bg-white/10"
              onClick={() => navigate("/explore")}
            >
              Browse Destinations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
