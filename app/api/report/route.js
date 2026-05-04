import { NextResponse } from "next/server";

export async function POST() {
  const mockReport = `## System Status Report
The Urja Precision Telemetry Grid is operating at **nominal capacity** with occasional flux events detected.
- **Current Load**: 142.5 MWh
- **Peak Projection**: 12.6 MW (Next 24 Hours)
- **Status**: Stable

### Recent Flux Events
- 10:42 AM: Voltage Drop at Node Alpha (High Severity)
- 09:15 AM: Flow Restriction in Sector 7g (Warning)

The AI model suggests maintaining current grid settings as weather conditions are projected to remain stable for the next 7 days.`;

  const mockInputs = {
    gridScore: { score: 85, status: "Stable", lastUpdated: new Date().toLocaleTimeString(), reasons: ["Normal load", "No critical weather events"], trend: [80, 82, 85, 84, 85, 85, 85] },
    overview: { metrics: { currentConsumptionMwh: 142.5, currentConsumptionDeltaPct: -2.4, peakDemandTodayKw: 8.4, peakDemandTime: "14:30", forecasted24hMwh: 3240, forecastedCapacityPct: 75 } },
    forecast: { next24h: { peakProjectionMw: 12.6, confidenceScorePct: 96.2 }, next7d: { peakProjectionMw: 14.2, confidenceScorePct: 94.8 }, next30d: { kpis: [{ value: 3840 }, {}, { value: "+6.1" }], xaiDrivers: [{ driver: "Weather", impact: "42%", color: "bg-[#E82127]" }] } },
    history: { currentMonthMwh: 12050, yoyChangePct: -1.2, peakDemandKw: 15.1, carbonOffsetKg: 4200, carbonOffsetProgressPct: 65 },
    anomalies: [
      { id: 1, severity: "CRITICAL", timestamp: "10:42 AM", classification: "Voltage Drop", delta: "-15%" },
      { id: 2, severity: "WARNING", timestamp: "09:15 AM", classification: "Flow Restriction", delta: "N/A" }
    ]
  };

  return NextResponse.json({
    report: mockReport,
    inputs: mockInputs,
    usedFallback: true,
    reason: "(Using simulated API endpoint)"
  });
}
