/**
 * ATLAS Analytics Service
 *
 * Provides a reusable tracking helper to send event payloads
 * to the ATLAS analytics backend.
 */

// Generate or retrieve persistent anonymous distinct ID from localStorage
const getOrCreateDistinctId = () => {
  try {
    const STORAGE_KEY = "atlas_distinct_id";
    let distinctId = localStorage.getItem(STORAGE_KEY);
    if (!distinctId) {
      distinctId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_KEY, distinctId);
    }
    return distinctId;
  } catch {
    return `anon_${Date.now()}`;
  }
};

/**
 * Normalizes the ATLAS analytics endpoint URL.
 * Handles base URLs, URLs with trailing slashes, or direct endpoint paths.
 */
const getAtlasEndpoint = () => {
  const rawUrl = process.env.REACT_APP_ATLAS_API_URL;
  if (!rawUrl) return null;

  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  // If the user already provided the full endpoint path
  if (
    trimmed.endsWith("/api/events") ||
    trimmed.endsWith("/events") ||
    trimmed.endsWith("/track")
  ) {
    return trimmed;
  }

  // If the base URL ends with /api, append /events
  if (trimmed.endsWith("/api")) {
    return `${trimmed}/events`;
  }

  // Standard Atlas event ingestion endpoint
  return `${trimmed}/api/events`;
};

/**
 * Reusable event tracking helper for ATLAS Analytics.
 *
 * @param {string} eventName - Name/type of the event (e.g. "page_view", "search_destination", "cta_click")
 * @param {string|null} [distinctId] - Optional user/distinct ID. Falls back to logged in user or anonymous ID.
 * @param {Object} [properties={}] - Custom event metadata / properties object.
 * @returns {Promise<boolean>} - Resolves to true if sent, false otherwise (safe, never throws).
 */
export const trackEvent = async (
  eventName,
  distinctId = null,
  properties = {},
) => {
  try {
    const apiKey = process.env.REACT_APP_ATLAS_API_KEY;
    const endpoint = getAtlasEndpoint();

    if (!endpoint || !apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[ATLAS Analytics] Tracking skipped: Missing REACT_APP_ATLAS_API_URL or REACT_APP_ATLAS_API_KEY.",
          { eventName, properties },
        );
      }
      return false;
    }

    // Resolve distinctId from argument, or logged in user, or anonymous local identifier
    const resolvedDistinctId =
      distinctId ||
      (() => {
        try {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            const user = JSON.parse(userStr);
            if (user?._id || user?.id || user?.email) {
              return user._id || user.id || user.email;
            }
          }
        } catch {
          // Ignore JSON parse errors
        }
        return getOrCreateDistinctId();
      })();

    const payload = {
      event: eventName,
      eventName,
      distinctId: resolvedDistinctId,
      properties: {
        ...properties,
        url: typeof window !== "undefined" ? window.location.href : "",
        path: typeof window !== "undefined" ? window.location.pathname : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };

    // Use native fetch with keepalive to ensure delivery even during unloads
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok && process.env.NODE_ENV === "development") {
      console.warn(
        `[ATLAS Analytics] Ingestion request failed with status ${response.status}: ${response.statusText}`,
      );
      return false;
    }

    return true;
  } catch (error) {
    // Non-blocking: Fail safely without impacting UI or app behavior
    if (process.env.NODE_ENV === "development") {
      console.warn("[ATLAS Analytics] Failed to send event:", error);
    }
    return false;
  }
};

const analyticsService = {
  trackEvent,
};

export default analyticsService;
