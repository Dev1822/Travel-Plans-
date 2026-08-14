import React from "react";
import { Link } from "react-router-dom";
import { Compass, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1B1B] text-[#FCF9F8] pt-16 pb-12 border-t border-[#333130]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#333130]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#FCF9F8] text-[#1C1B1B] flex items-center justify-center font-serif text-lg font-bold">
                P
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FCF9F8]">
                PackGo
              </span>
            </Link>
            <p className="text-sm text-[#DAC2B6] font-sans leading-relaxed max-w-sm">
              An intentional travel companion celebrating the rich heritage,
              slow rhythms, and vivid landscapes of India. Discover, plan, and
              wander with elegance.
            </p>
            <div className="text-xs text-[#877369]">
              Built with reverence for cultural exploration.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFB68C]">
              Discover
            </h4>
            <ul className="space-y-2 text-xs text-[#DAC2B6]">
              <li>
                <Link
                  to="/explore"
                  className="hover:text-white transition-colors"
                >
                  All Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?tab=experiences"
                  className="hover:text-white transition-colors"
                >
                  Cultural Experiences
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="hover:text-white transition-colors"
                >
                  Travel Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Account / Journeys */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFB68C]">
              Journeys
            </h4>
            <ul className="space-y-2 text-xs text-[#DAC2B6]">
              <li>
                <Link
                  to="/my-journey"
                  className="hover:text-white transition-colors"
                >
                  My Journeys
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors"
                >
                  Account Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Note / Philosophy */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFB68C]">
              Slow Travel
            </h4>
            <p className="text-xs text-[#DAC2B6] leading-relaxed">
              "To travel is to discover that everyone is wrong about other
              countries." PackGo invites you to look closer, travel deeper, and
              respect local communities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#877369] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} PackGo. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/contact"
              className="hover:text-[#DAC2B6] transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/how-it-works"
              className="hover:text-[#DAC2B6] transition-colors"
            >
              Philosophy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
