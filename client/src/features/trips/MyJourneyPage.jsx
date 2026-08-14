import React, { useState, useEffect } from "react";
import { tripsApi } from "../../services/api/tripsApi";
import TripCard from "../../components/TripCard";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import LoadingState, { CardSkeleton } from "../../components/LoadingState";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import CreateTripModal from "./CreateTripModal";
import { Map, Plus, Compass, Calendar, CheckCircle2 } from "lucide-react";

export const MyJourneyPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await tripsApi.getAll({ page: 1, limit: 50 });
      if (res.data?.data) {
        setTrips(res.data.data);
      } else if (Array.isArray(res.data)) {
        setTrips(res.data);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Failed to retrieve your journey records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleTripCreated = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev]);
  };

  const filteredTrips = trips.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  // Calculate statistics
  const plannedCount = trips.filter((t) => t.status === "planned").length;
  const ongoingCount = trips.filter((t) => t.status === "ongoing").length;
  const completedCount = trips.filter((t) => t.status === "completed").length;
  const totalBudget = trips.reduce(
    (acc, t) => acc + (Number(t.budget) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-[#FCF9F8] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-8 border-b border-[#E5E2E1]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6C2F00] mb-2 block">
              Personal Travel Records
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B1B]">
              My Journeys
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#54433A]">
              Manage planned expeditions, active travels, and memorable past
              odysseys.
            </p>
          </div>

          <div className="mt-6 sm:mt-0">
            <Button
              variant="terracotta"
              size="md"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Chart New Journey
            </Button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#FFFFFF] p-5 border border-[#E5E2E1] rounded shadow-xs">
            <span className="text-xs font-semibold uppercase text-[#877369]">
              Total Journeys
            </span>
            <p className="font-serif text-2xl font-bold text-[#1C1B1B] mt-1">
              {trips.length}
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-5 border border-[#E5E2E1] rounded shadow-xs">
            <span className="text-xs font-semibold uppercase text-[#5B3912]">
              Planned
            </span>
            <p className="font-serif text-2xl font-bold text-[#6C2F00] mt-1">
              {plannedCount}
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-5 border border-[#E5E2E1] rounded shadow-xs">
            <span className="text-xs font-semibold uppercase text-[#2E4632]">
              Ongoing
            </span>
            <p className="font-serif text-2xl font-bold text-[#2E4632] mt-1">
              {ongoingCount}
            </p>
          </div>
          <div className="bg-[#FFFFFF] p-5 border border-[#E5E2E1] rounded shadow-xs">
            <span className="text-xs font-semibold uppercase text-[#877369]">
              Planned Budget
            </span>
            <p className="font-serif text-2xl font-bold text-[#1C1B1B] mt-1">
              ₹{totalBudget.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 pb-6 overflow-x-auto">
          {[
            { id: "all", label: `All (${trips.length})` },
            { id: "planned", label: `Planned (${plannedCount})` },
            { id: "ongoing", label: `Ongoing (${ongoingCount})` },
            { id: "completed", label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#1C1B1B] text-[#FCF9F8]"
                  : "bg-[#FFFFFF] text-[#54433A] border border-[#DAC2B6] hover:border-[#1C1B1B]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trips Grid Content */}
        {loading ? (
          <CardSkeleton count={3} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchTrips} />
        ) : filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Map}
            title={
              filterStatus === "all"
                ? "No Journeys Charted Yet"
                : `No ${filterStatus} journeys found`
            }
            description="Embark on your next expedition across India by defining your destination, travel dates, and budget."
            actionLabel="Chart Your First Journey"
            onAction={() => setIsCreateModalOpen(true)}
          />
        )}
      </div>

      {/* Create Trip Modal */}
      {isCreateModalOpen && (
        <CreateTripModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTripCreated={handleTripCreated}
        />
      )}
    </div>
  );
};

export default MyJourneyPage;
