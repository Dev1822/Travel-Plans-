import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tripsApi } from "../../services/api/tripsApi";
import { destinationsApi } from "../../services/api/destinationsApi";
import { getErrorMessage } from "../../services/api/client";
import Modal from "../../components/Modal";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import {
  Calendar,
  MapPin,
  DollarSign,
  AlertCircle,
  Building,
  Plane,
} from "lucide-react";

export const CreateTripModal = ({
  isOpen,
  onClose,
  defaultDestination = "",
  onTripCreated,
}) => {
  const [formData, setFormData] = useState({
    destination: defaultDestination,
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    status: "planned",
    accommodationName: "",
    accommodationCheckIn: "",
    accommodationCheckOut: "",
    accommodationAddress: "",
    transportType: "",
    transportBookingRef: "",
  });

  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Autocomplete on destination typing
  useEffect(() => {
    const q = formData.destination.trim();
    if (q.length < 2) {
      setAutocompleteResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await destinationsApi.search(q);
        if (Array.isArray(res.data)) {
          setAutocompleteResults(res.data);
        }
      } catch (err) {
        console.warn("Autocomplete error:", err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [formData.destination]);

  // Today's date string YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.destination.trim()) {
      setError("Please specify a destination.");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("Please provide start and end travel dates.");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date must be on or after start date.");
      return;
    }

    setLoading(true);

    const payload = {
      destination: formData.destination.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description.trim(),
      budget: formData.budget ? Number(formData.budget) : 0,
      status: formData.status,
    };

    if (formData.accommodationName) {
      payload.accommodation = {
        name: formData.accommodationName,
        checkIn: formData.accommodationCheckIn || formData.startDate,
        checkOut: formData.accommodationCheckOut || formData.endDate,
        address: formData.accommodationAddress,
      };
    }

    if (formData.transportType) {
      payload.transportation = {
        type: formData.transportType,
        bookingRef: formData.transportBookingRef,
      };
    }

    try {
      const res = await tripsApi.create(payload);
      onClose();
      if (onTripCreated) {
        onTripCreated(res.data);
      } else {
        navigate(`/trips/${res.data._id}`);
      }
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Failed to create trip. Please verify your inputs.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chart a New Journey"
      subtitle="Define dates, budget, and destination for your next expedition."
      maxWidth="max-w-2xl"
    >
      {error && (
        <div className="mb-6 p-4 rounded bg-[#FFDAD6]/40 border border-[#BA1A1A]/30 flex items-start space-x-3 text-xs text-[#BA1A1A]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination with Autocomplete */}
        <div className="relative">
          <FormField
            label="Destination Landmark / City"
            name="destination"
            icon={MapPin}
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            placeholder="e.g. Udaipur, Taj Mahal, Goa, Varanasi"
            required
            autoComplete="off"
          />

          {autocompleteResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-[#FFFFFF] border border-[#DAC2B6] rounded shadow-lg max-h-48 overflow-y-auto">
              {autocompleteResults.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      destination: item.city || item.name,
                    });
                    setAutocompleteResults([]);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#F6F3F2] flex items-center justify-between border-b border-[#F0EDED] last:border-0"
                >
                  <span className="font-semibold text-[#1C1B1B]">
                    {item.name}
                  </span>
                  <span className="text-[#877369]">
                    {item.city}, {item.state}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            label="Start Date"
            name="startDate"
            type="date"
            icon={Calendar}
            min={todayStr}
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />

          <FormField
            label="End Date"
            name="endDate"
            type="date"
            icon={Calendar}
            min={formData.startDate || todayStr}
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>

        {/* Budget & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            label="Target Budget (INR)"
            name="budget"
            type="number"
            icon={DollarSign}
            min="0"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            placeholder="e.g. 25000"
          />

          <div className="flex flex-col">
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#54433A] mb-1.5">
              Journey Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="py-2.5 px-2 bg-transparent border-b border-[#DAC2B6] text-xs font-semibold uppercase text-[#1C1B1B] focus:outline-none focus:border-[#6C2F00]"
            >
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Notes / Description */}
        <FormField
          as="textarea"
          label="Trip Vision / Notes"
          name="description"
          rows={2}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Brief notes about travel companions, expectations, and key stops..."
        />

        {/* Optional Stay & Transport Accordion */}
        <div className="pt-4 border-t border-[#E5E2E1] space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#877369] block">
            Optional Logistics Details
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Hotel / Stay Name"
              name="accommodationName"
              icon={Building}
              value={formData.accommodationName}
              onChange={(e) =>
                setFormData({ ...formData, accommodationName: e.target.value })
              }
              placeholder="e.g. Heritage Haveli Palace"
            />

            <FormField
              label="Transit Type"
              name="transportType"
              icon={Plane}
              value={formData.transportType}
              onChange={(e) =>
                setFormData({ ...formData, transportType: e.target.value })
              }
              placeholder="e.g. Flight, Train, Private Car"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#E5E2E1] flex justify-end space-x-3">
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="terracotta"
            size="md"
            loading={loading}
          >
            Create Journey
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTripModal;
