"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const anomalyData = [
  { id: 1, severity: "CRITICAL", timestamp: "2023-10-27 14:32:01", classification: "Unusual Load", description: "Unexpected surge detected in Sector 7 Alpha grid during non-peak operations.", delta: "+14.2 MWh", deltaColor: "text-[#E82127]", isCritical: true },
  { id: 2, severity: "WARNING", timestamp: "2023-10-27 09:15:44", classification: "Off-peak Spike", description: "Minor thermal variation noted in primary transformer array beta.", delta: "+3.8 MWh", deltaColor: "text-[#f59e0b]", isCritical: false },
  { id: 3, severity: "CRITICAL", timestamp: "2023-10-26 23:59:12", classification: "Sudden Drop", description: "Immediate loss of telemetry from remote node Delta-4. Failover engaged.", delta: "-22.1 MWh", deltaColor: "text-electric-blue", isCritical: true },
  { id: 4, severity: "WARNING", timestamp: "2023-10-26 18:22:35", classification: "Frequency Drift", description: "Grid frequency deviation of 0.08Hz detected in sector 3.", delta: "+0.8 MWh", deltaColor: "text-[#f59e0b]", isCritical: false },
  { id: 5, severity: "INFO", timestamp: "2023-10-26 11:05:00", classification: "Maintenance Mode", description: "Substation Beta entering scheduled maintenance window.", delta: "0.0 MWh", deltaColor: "text-on-surface-variant", isCritical: false },
];

const logStream = [
  { time: "14:45:01", text: "SYS_CHECK_OK: Sector 4 Nominal.", color: "text-zinc-400" },
  { time: "14:45:03", text: "WARN: Anomalous freq variance detected (0.02Hz).", color: "text-[#E82127]" },
  { time: "14:45:04", text: "AUTO_CORRECT: Capacitor bank engaged.", color: "text-zinc-400" },
  { time: "14:45:08", text: "RESOLVED: Variance normalized. Monitoring.", color: "text-[#00E599]" },
  { time: "14:45:10", text: "HEARTBEAT: All systems nominal.", color: "text-zinc-400" },
];

export default function AnomaliesPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? anomalyData : anomalyData.filter(a => a.severity === filter);

  return (
    <DashboardLayout title="TELEMETRY_X">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-display-xl text-display-xl text-white mb-xs tracking-tight">Anomaly Detection Log</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined text-[#E82127] text-[18px]">warning</span>
            System requires attention. {anomalyData.filter(a => a.isCritical).length} critical events logged in last 24h.
          </p>
        </div>
        <div className="flex gap-sm">
          {["ALL","CRITICAL","WARNING","INFO"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-md py-xs rounded text-white font-label-caps text-label-caps uppercase transition-colors flex items-center gap-xs border ${
                filter === f
                  ? "border-[#008CFF] bg-[#008CFF]/10 text-[#008CFF]"
                  : "bg-[#1F1F1F] border-[#262626] hover:border-[#E82127]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="data-card rounded-lg w-full overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#262626] bg-[#0e0e0e]">
              {["Severity","Timestamp (UTC)","Classification","Description","Delta (MWh)","Action"].map(h => (
                <th key={h} className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono-data text-mono-data divide-y divide-[#262626]">
            {filtered.map(row => (
              <tr key={row.id} className={`hover:bg-[#1a1a1a] transition-colors cursor-pointer ${row.isCritical ? "bg-[rgba(232,33,39,0.05)] border-l-2 border-[#E82127]" : "border-l-2 border-transparent"}`}>
                <td className="p-md">
                  <div className={`flex items-center gap-xs ${row.severity === "CRITICAL" ? "text-[#E82127]" : row.severity === "WARNING" ? "text-[#f59e0b]" : "text-on-surface-variant"}`}>
                    {row.isCritical && <span className="w-2 h-2 rounded-full bg-[#E82127] pulse-critical"></span>}
                    {!row.isCritical && row.severity === "WARNING" && <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>}
                    {row.severity === "INFO" && <span className="w-2 h-2 rounded-full bg-on-surface-variant"></span>}
                    {row.severity}
                  </div>
                </td>
                <td className="p-md text-on-surface">{row.timestamp}</td>
                <td className="p-md text-on-surface">{row.classification}</td>
                <td className="p-md text-on-surface-variant truncate max-w-xs md:max-w-md">{row.description}</td>
                <td className={`p-md text-right font-bold ${row.deltaColor}`}>{row.delta}</td>
                <td className="p-md text-center">
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">manage_search</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live Diagnostic Stream */}
      <div className="data-card rounded-lg p-md">
        <div className="flex items-center justify-between mb-sm border-b border-[#262626] pb-xs">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">Live Diagnostic Stream</span>
          <span className="w-2 h-2 bg-[#00E599] rounded-full animate-pulse"></span>
        </div>
        <div className="font-mono-data text-[12px] text-zinc-500 h-24 overflow-y-hidden flex flex-col gap-1">
          {logStream.map((log, i) => (
            <div key={i} className="flex gap-sm">
              <span>[{log.time}]</span>
              <span className={log.color}>{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
