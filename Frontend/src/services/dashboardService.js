// Dummy implementation - returns hard-coded data for now.
// Later you will replace this with real API calls to your Python backend.

export async function getDashboardOverview(filters) {
  // filters = { range, channel, brand } - not used yet, but ready for backend
  return {
    summary: {
      overallSentiment: 0.42,
      mentions: 12340,
      positivePct: 62,
      negativePct: 18,
      activeAlerts: 3,
    },
    trend: [
      { date: "2026-02-01", sentiment: 0.35, mentions: 1500 },
      { date: "2026-02-02", sentiment: 0.4, mentions: 1600 },
      { date: "2026-02-03", sentiment: 0.45, mentions: 1700 },
      { date: "2026-02-04", sentiment: 0.5, mentions: 1800 },
    ],
    topics: [
      { name: "Delivery delays", sentiment: -0.3, mentions: 800 },
      { name: "New launch", sentiment: 0.7, mentions: 600 },
      { name: "Pricing", sentiment: 0.1, mentions: 500 },
    ],
    channels: [
      { name: "Social", sentiment: 0.5, mentions: 7200 },
      { name: "Reviews", sentiment: 0.3, mentions: 3000 },
      { name: "News", sentiment: 0.1, mentions: 2140 },
    ],
    alerts: [
      { level: "high", message: "Negative spike for Brand X on Twitter" },
      { level: "medium", message: "Surge in topic 'delivery delay'" },
      { level: "low", message: "Mild drop in positive sentiment for Brand Y" },
    ],
    summaryText:
      "Customers are happy with the new product quality, but complaints about delivery delays have increased this week.",
  };
}

// import http from "./httpClient";

// export async function getDashboardOverview(filters) {
//   const response = await http.get("/api/dashboard", {
//     params: {
//     
//       channel: filters.channel,
//       brand: filters.brand,
//     },
//   });

//   return response.data;
// }

