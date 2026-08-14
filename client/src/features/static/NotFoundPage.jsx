import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Compass, Home, ArrowLeft } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-xl w-full text-center">
        {/* Soft icon container */}
        <div className="w-20 h-20 rounded-full bg-[#FFDBC9]/60 text-[#6C2F00] flex items-center justify-center mx-auto mb-8">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C2F00] block mb-2">
          404 · Trail Not Found
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#1C1B1B] mb-4">
          Wandering Off the Map
        </h1>

        <p className="text-sm sm:text-base text-[#54433A] font-sans leading-relaxed mb-10 max-w-md mx-auto">
          The page or landmark you are looking for has either shifted like
          desert sands or was not charted on our journey map.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Return to Sanctuary
            </Button>
          </Link>

          <Link to="/explore">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
