"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AnomalyChart from "@/components/AnomalyChart";

export default function AnomaliesPage() {
  const [filter, setFilter] = useState("ALL");
  const [anomalyData, setAnomalyData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data generated from real model outputs
    Promise.all([
      fetch('/chart_data.json').then(res => res.json()),
      fetch('/anomaly_table.json').then(res => res.json())
    ]).then(([chartRes, tableRes]) => {
      setChartData(chartRes);
      setAnomalyData(tableRes);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load data:", err);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "ALL" ? anomalyData : anomalyData.filter(a => a.severity === filter);

  return (
    <DashboardLayout title="TELEMETRY_X">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-display-xl text-display-xl text-white mb-xs tracking-tight">Anomaly Detection Log</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined text-[#E82127] text-[18px]">warning</span>
            System requires attention. {anomalyData.filter(a => a.isCritical).length} critical events logged.
          </p>
        </div>
        <div className="flex gap-sm">
          {["ALL","CRITICAL","HIGH","MEDIUM"].map(f => (
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

      {/* Historical Chart */}
      <div className="data-card rounded-lg w-full p-md mt-md">
        <div className="flex items-center justify-between mb-sm border-b border-[#262626] pb-xs">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">Historical Consumption & Anomalies</span>
          <span className="w-2 h-2 bg-[#00E599] rounded-full animate-pulse"></span>
        </div>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-on-surface-variant">Loading model output...</div>
        ) : (
          <AnomalyChart data={chartData} />
        )}
      </div>

      {/* Table */}
      <div className="data-card rounded-lg w-full overflow-x-auto mt-md">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#262626] bg-[#0e0e0e]">
              {["Severity","Timestamp (UTC)","Type","Consumption (MWh)","Ensemble Score","Action"].map(h => (
                <th key={h} className="p-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono-data text-mono-data divide-y divide-[#262626]">
            {loading ? (
              <tr><td colSpan="6" className="p-md text-center text-on-surface-variant">Loading data...</td></tr>
            ) : filtered.map(row => (
              <tr key={row.id} className={`hover:bg-[#1a1a1a] transition-colors cursor-pointer ${row.isCritical ? "bg-[rgba(232,33,39,0.05)] border-l-2 border-[#E82127]" : "border-l-2 border-transparent"}`}>
                <td className="p-md">
                  <div className={`flex items-center gap-xs ${row.severity === "CRITICAL" ? "text-[#E82127]" : row.severity === "HIGH" ? "text-[#f59e0b]" : "text-[#eab308]"}`}>
                    {row.isCritical && <span className="w-2 h-2 rounded-full bg-[#E82127] pulse-critical"></span>}
                    {row.severity === "HIGH" && <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>}
                    {row.severity === "MEDIUM" && <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>}
                    {row.severity}
                  </div>
                </td>
                <td className="p-md text-on-surface">{row.timestamp}</td>
                <td className="p-md text-on-surface font-bold">{row.anomaly_type}</td>
                <td className="p-md text-on-surface-variant">{row.consumption}</td>
                <td className={`p-md text-right font-bold ${row.ensemble_score > 0.8 ? "text-[#E82127]" : row.ensemble_score > 0.6 ? "text-[#f59e0b]" : "text-[#eab308]"}`}>{row.ensemble_score.toFixed(3)}</td>
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


    </DashboardLayout>
  );
}
