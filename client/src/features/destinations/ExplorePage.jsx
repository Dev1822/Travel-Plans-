import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { destinationsApi } from "../../services/api/destinationsApi";
import LoadingState from "../../components/LoadingState";
import { Search, ArrowRight, MapPin } from "lucide-react";

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeZone = searchParams.get("zone") || "all";
  const searchQuery = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const zones = [
    { id: "all", label: "All" },
    { id: "popular", label: "Popular" },
    { id: "North India", label: "North India" },
    { id: "South India", label: "South India" },
    { id: "West India", label: "West India" },
    { id: "East India", label: "East India" },
  ];

  const fetchDestinations = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (activeZone !== "all" && activeZone !== "popular")
        params.zone = activeZone;

      const res = await destinationsApi.getAll(params);
      const data = res.data?.data || res.data?.destinations || res.data || [];
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to fetch live destinations:", err);
      setError("Unable to load the destinations catalogue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [activeZone, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const nextParams = {};
    if (activeZone !== "all") nextParams.zone = activeZone;
    if (localSearch.trim()) nextParams.search = localSearch.trim();
    setSearchParams(nextParams);
  };

  const handleZoneSelect = (zoneId) => {
    const nextParams = {};
    if (zoneId !== "all") nextParams.zone = zoneId;
    if (searchQuery) nextParams.search = searchQuery;
    setSearchParams(nextParams);
  };

  // Stitch Curated Editorial Items
  const curatedDestinations = [
    {
      _id: "jaipur",
      name: "Jaipur",
      state: "Rajasthan",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfnq0VBo3FZ9nKCt6lqkYkXkMIYPYXfSB8g-MkvhXQm-WQiFNv3o5gnvs0oe15uMp0yahwQi4WbxZJWu4rZqs4j-0Z8ZVLSaSmO2x2847ohAT5kpg2aG1W-_-DCu7muPtt3qS-7h99qV_Caomzeq2njg3zD8BhSD__ZbL0D1NYzUwJ6ebOeTHETxuj0ZJI_GqwlVk4rqZhb7SQpkYBjEH01oiKu_tYpbMR7zZxHREZSKmZZE0S6XUCg",
      gridSpan: "md:col-span-8 h-[480px]",
    },
    {
      _id: "kerala",
      name: "Kerala",
      state: "South India",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZaWG-1I37o30-x7EMPUBOx8gxI6RvWQIUMhH_1jZG6dudLwDq8z0gukjByWNoCg6-2frqu8j8jHIhv50VLU2G3KWzyzhdjCkfPHvI7h4YnMzWoQL43RDx93ZHThdtXC8owpZg-1GSinW37ltxYK-5Z6k-ISB7TFGDq6jVutgnGwPoYAzOnryR3dYOZgrvlSZqEmXnehyx-QKgMYEQLJl_3dXsbXWjOh78ZWes_gntHGfZVJqNNTqKmg",
      gridSpan: "md:col-span-4 h-[480px]",
    },
    {
      _id: "goa",
      name: "Goa",
      state: "West Coast",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC1HlmHFMnbrftuq8151JdqUBJcq_kkrv4bcTdxXYWoa1zO2pCkr4Sk6YPM90whHi-t2iNjolmhOkarRRb9MzOj3N3FDSpoxWucNqtD6W_uxPC8blfPD9xk1cdhiCarqqFk9Lo0H-vTJHOBu0TgpMJslVoWk1EvNWJci1RkFwva5Rd--kg1Puw1wGh84gLa-eVo-iXRJpfVsrgz6YFH1I04QcVpX-yBPy6U9tb5l9M2-leCnSKN5QbSoQ",
      gridSpan: "md:col-span-4 h-[400px]",
    },
    {
      _id: "varanasi",
      name: "Varanasi",
      state: "Uttar Pradesh",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAB1XtALEQrneuH0KhU7_s-2F5o7VLYETnd2Wdw9IVWt-6LqqaE2a7ZK8wrIYQgG171adUp1IxjE3bo6PX3ji6rf0HpUIDtBexWzUajhWrM1dr6m41rnOXSkZeoJQ61pRTCFgtgjNc5VpFfk_3_ALCIbhDGMw-9ivzLZmVpoO51_Hl1cuAN2Uuy-Y8x3DPldlGHZHN1arM-nPmyGCXJBTqqBlHyQCvIn3Zf0Iv3Sv4Dk-0_Uo_VnD5PGA",
      gridSpan: "md:col-span-4 h-[400px]",
    },
    {
      _id: "manali",
      name: "Manali",
      state: "Himachal Pradesh",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAerAQxqxzgJBiT-gJQQaWKf8X_NbfvMkZBIHn0SvVozFMx_DdbIjHN-duzejabsNNYHOVTgBhHxB73yKB9VbRX-AtBM55SQjNqSz2V8qQ3lZhgzEKwtbw-GUDe25LBS0kMDkHKfQ3Zp9lrJvzVpZbQQqE0Z0fPkAO7f6zM3YwFm2Cd7dPBxspEp55m310sct7XQ4Z6OOjnxHFH8Ofa2Lofo34pmM3bgBZQWn_u_SHLwWyiZTHAHgTVNQ",
      gridSpan: "md:col-span-4 h-[400px]",
    },
  ];

  return (
    <div className="bg-[#FCF9F8] text-[#1C1B1B] min-h-screen pb-32">
      {/* ── 1. HERO HEADER ── */}
      <header className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pt-32 pb-14 sm:pt-44 sm:pb-20 flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-[#1C1B1B]">
          Explore India
        </h1>
        <p className="text-base sm:text-lg text-[#54433A] max-w-xl mb-12">
          Discover places worth remembering, from historic cities to peaceful
          escapes.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl relative"
        >
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#877369]" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search destinations, cities or states..."
            className="w-full bg-transparent border-b border-[#DAC2B6] focus:border-[#6C2F00] px-12 py-4 text-base sm:text-lg text-[#1C1B1B] placeholder-[#877369]/60 focus:outline-hidden transition-colors"
          />
        </form>
      </header>

      {/* ── 2. CATEGORY & ZONE FILTER TABS ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pb-16 overflow-x-auto hide-scrollbar">
        <div className="flex gap-8 whitespace-nowrap border-b border-[#DAC2B6]/30 pb-4">
          {zones.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => handleZoneSelect(z.id)}
              className={`text-xs font-semibold uppercase tracking-widest pb-4 -mb-[18px] transition-colors cursor-pointer ${
                activeZone === z.id
                  ? "text-[#6C2F00] border-b-2 border-[#6C2F00]"
                  : "text-[#54433A] hover:text-[#6C2F00]"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED DESTINATION HERO (Udaipur, Rajasthan) ── */}
      {!searchQuery &&
        (activeZone === "all" ||
          activeZone === "popular" ||
          activeZone === "North India") && (
          <section className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto pb-24">
            <Link
              to="/destinations/udaipur"
              className="relative w-full h-[520px] sm:h-[720px] overflow-hidden rounded block bg-[#1C1B1B] group image-zoom cursor-pointer shadow-sm"
            >
              <div
                className="w-full h-full bg-cover bg-center absolute inset-0 transform transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxWl-xnZHodPN0zPTcw8fKTdasw9qPGifOaAwnFmL5RWafIdVS4ZeMfklhfQaYYA9YLh39uhYHkczYdkEbmZez0M3EzYunQbERz4uum7mnEHiPamor4vhcsWr_RoqiVHYYWtNxdK_iizMbMsC9436FC0KoRSmENslHNKcQbQxk8Dx_LNHtQLEiQMWQgqpvcwo7gXFPtW0_x0ijuTJQSFNHT5dEaaOwVIZvqYpBI-cyOiB_G6ydekRcsw")`,
                }}
              />
              <div className="absolute inset-0 scrim-bottom" />
              <div className="absolute bottom-0 left-0 p-8 sm:p-16 w-full md:w-2/3 text-white space-y-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#FFB68C] block mb-2">
                  Featured Destination
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl font-bold">
                  Udaipur, Rajasthan
                </h2>
                <p className="text-sm sm:text-base text-[#FCF9F8]/90 max-w-xl leading-relaxed">
                  Lakes, palaces and timeless streets make Udaipur one of
                  India’s most atmospheric escapes.
                </p>
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white border-b border-white pb-1 group-hover:opacity-80 transition-opacity">
                    <span>Explore Udaipur</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

      {/* ── 4. ASYMMETRICAL EDITORIAL DESTINATIONS GRID ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-12">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1B]">
          Discover more
        </h3>

        {loading ? (
          <LoadingState message="Unfurling destination catalogue..." />
        ) : error ? (
          <div className="p-8 bg-[#FFDAD6]/30 border border-[#BA1A1A]/30 rounded text-center">
            <p className="text-xs font-semibold text-[#BA1A1A]">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {destinations.length > 0
              ? destinations.map((dest, idx) => {
                  const isLarge = idx % 5 === 0;
                  const spanClass = isLarge
                    ? "md:col-span-8 h-[480px]"
                    : "md:col-span-4 h-[480px]";
                  const cover =
                    dest.imageUrl ||
                    (dest.images && dest.images[0]) ||
                    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80";

                  return (
                    <Link
                      key={dest._id || dest.name}
                      to={`/destinations/${dest.slug || dest._id}`}
                      className={`relative ${spanClass} overflow-hidden rounded bg-[#1C1B1B] group image-zoom cursor-pointer shadow-sm`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center absolute inset-0 transform transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url("${cover}")` }}
                      />
                      <div className="absolute inset-0 scrim-bottom" />
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h4 className="font-serif text-3xl sm:text-4xl font-bold">
                          {dest.name}
                        </h4>
                        <p className="text-xs text-[#FFB68C] font-semibold uppercase tracking-widest mt-1.5">
                          {dest.state || dest.zone || "India"}
                        </p>
                      </div>
                    </Link>
                  );
                })
              : curatedDestinations.map((item) => (
                  <Link
                    key={item._id}
                    to="/destinations/udaipur"
                    className={`relative ${item.gridSpan} overflow-hidden rounded bg-[#1C1B1B] group image-zoom cursor-pointer shadow-sm`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center absolute inset-0 transform transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${item.imageUrl}")` }}
                    />
                    <div className="absolute inset-0 scrim-bottom" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <h4 className="font-serif text-3xl sm:text-4xl font-bold">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#FFB68C] font-semibold uppercase tracking-widest mt-1.5">
                        {item.state}
                      </p>
                    </div>
                  </Link>
                ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;
