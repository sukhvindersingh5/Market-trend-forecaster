// src/services/futureTrendsService.js
import httpClient from "./httpClient";

/**
 * Fetch forecast data for a given brand and horizon.
 *
 * @param {Object} params
 * @param {string} params.brand    - "echo-dot" | "nest-mini" | "homepod-mini"
 * @param {number} params.horizon  - 7 | 30 (days ahead)
 */
export async function getForecasts({ brand, horizon }) {
  const response = await httpClient.get("/api/forecasts", {
    params: { brand, horizon },
  });

  // Expecting backend to return:
  // {
  //   brand,
  //   horizon,
  //   history: [{ date, sentiment, volume }, ...],
  //   forecast: [{ date, sentiment, volume }, ...],
  //   summary: { avg_future_sentiment, delta_vs_last_week, risk_level }
  // }

  return response.data;
}
