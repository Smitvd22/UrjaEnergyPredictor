"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useReportStream } from "@/lib/useReportStream";

function stripMarkdown(text) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/`{1,3}/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1");
}

function formatNumber(value) {
  return typeof value === "number" ? value.toLocaleString() : value;
}

function formatPercent(value) {
  if (typeof value !== "number") return value;
  return `${value > 0 ? "+" : ""}${value}%`;
}

function renderRow(label, value) {
  return (
    <div className="flex items-center justify-between text-[12px] text-zinc-300">
      <span className="text-zinc-500">{label}</span>
      <span>{value ?? "--"}</span>
    </div>
  );
}

function getAnomalyCounts(anomalies = []) {
  return anomalies.reduce(
    (acc, item) => {
      const key = item.severity || "UNKNOWN";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { CRITICAL: 0, WARNING: 0, INFO: 0 }
  );
}

function getGridScoreTrend(gridScore) {
  if (Array.isArray(gridScore?.trend) && gridScore.trend.length > 0) {
    return gridScore.trend;
  }

  return [88, 90, 91, 92, 92, 93, 92];
}

function getExplainability(inputs) {
  if (!inputs) return null;

  const anomalyCounts = getAnomalyCounts(inputs.anomalies || []);
  const drivers = inputs.forecast?.next30d?.xaiDrivers || [];

  return {
    anomalyCounts,
    drivers,
    gridReasons: inputs.gridScore?.reasons || [],
  };
}

export default function ReportPage() {
  const [report, setReport] = useState("");
  const [inputs, setInputs] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatStatus, setChatStatus] = useState("idle");
  const [chatLanguage, setChatLanguage] = useState("English");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const generateReport = useCallback(async () => {
    setStatus("loading");
    setReason("");

    try {
      const response = await fetch("/api/report", { method: "POST" });
      const data = await response.json();

      setReport(data.report || "No report returned.");
      setInputs(data.inputs || null);
      setUsedFallback(Boolean(data.usedFallback));
      setReason(data.reason || "");
      setStatus("ready");
    } catch (error) {
      setReport("Report generation failed. Please try again.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    generateReport();
  }, [generateReport]);

  const { inputs: liveInputs, liveStatus, lastUpdated } = useReportStream(inputs);
  const activeInputs = liveInputs || inputs;

  const plainReport = useMemo(() => stripMarkdown(report || ""), [report]);
  const reportBody = report || "Generating report...";
  const explainability = useMemo(() => getExplainability(activeInputs), [activeInputs]);
  const anomalyCounts = useMemo(() => getAnomalyCounts(activeInputs?.anomalies || []), [activeInputs]);
  const gridTrend = useMemo(() => getGridScoreTrend(activeInputs?.gridScore), [activeInputs]);

  const forecastPeaks = useMemo(() => {
    if (!activeInputs?.forecast) return [];
    return [
      { label: "24H", value: activeInputs.forecast?.next24h?.peakProjectionMw, unit: "MW" },
      { label: "7D", value: activeInputs.forecast?.next7d?.peakProjectionMw, unit: "MW" },
      { label: "30D", value: activeInputs.forecast?.next30d?.kpis?.[0]?.value, unit: "MWh" },
    ];
  }, [activeInputs]);

  const historicalBars = useMemo(() => {
    if (!activeInputs?.history) return [];
    return [
      { label: "YoY Change", value: activeInputs.history.yoyChangePct ?? 0, unit: "%" },
      { label: "Carbon Offset", value: activeInputs.history.carbonOffsetProgressPct ?? 0, unit: "%" },
    ];
  }, [activeInputs]);

  const speakText = useCallback((text) => {
    if (!text || typeof window === "undefined") return;
    const synthesis = window.speechSynthesis;
    if (!synthesis) return;
    synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthesis.getVoices();
    const voiceMatch = voices.find((voice) => voice.lang?.toLowerCase().startsWith(chatLanguage.toLowerCase().slice(0, 2)));
    if (voiceMatch) utterance.voice = voiceMatch;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synthesis.speak(utterance);
  }, [chatLanguage]);

  const stopSpeech = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const handleChatSubmit = useCallback(async () => {
    const question = chatInput.trim();
    if (!question || chatStatus === "loading") return;

    setChatMessages((prev) => [...prev, { role: "user", content: question }]);
    setChatInput("");
    setChatStatus("loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, language: chatLanguage, inputs: activeInputs }),
      });
      const data = await response.json();
      const answer = data.answer || "No response returned.";
      setChatMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setChatStatus("ready");
      speakText(answer);
    } catch (error) {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Chat request failed. Please try again." }]);
      setChatStatus("error");
    }
  }, [chatInput, chatLanguage, activeInputs, chatStatus, speakText]);

  return (
    <DashboardLayout title="URJA">
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-md">
          <div>
            <h2 className="font-display-xl text-display-xl text-white">AI Operations Report</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Consolidated anomalies, history, forecast, and grid score insights.
            </p>
          </div>
          <div className="flex items-center gap-sm">
            <button
              type="button"
              onClick={() => (isSpeaking ? stopSpeech() : speakText(plainReport || reportBody))}
              className="px-4 py-2 rounded-md border border-[#262626] text-zinc-200 font-label-caps text-label-caps hover:bg-[#141414] transition-colors"
            >
              {isSpeaking ? "Stop Speech" : "Speak Report"}
            </button>
            <button
              type="button"
              onClick={() => setChatOpen((prev) => !prev)}
              className="px-4 py-2 rounded-md border border-[#262626] text-zinc-200 font-label-caps text-label-caps hover:bg-[#141414] transition-colors"
            >
              Chat Assist
            </button>
            <button
              type="button"
              onClick={generateReport}
              className="px-4 py-2 rounded-md bg-[#008CFF] text-white font-label-caps text-label-caps hover:bg-blue-600 transition-colors"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Generating..." : "Regenerate"}
            </button>
          </div>
        </div>

        {usedFallback && (
          <div className="bg-[#1F1F1F] border border-yellow-500/40 rounded-lg p-md text-yellow-200">
            AI key not configured. Showing fallback report. {reason}
          </div>
        )}

        {status === "error" && (
          <div className="bg-[#1F1F1F] border border-red-500/40 rounded-lg p-md text-red-200">
            {report || "Report generation failed."}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Report</h3>
              <div className="flex items-center gap-3">
                <span className="font-mono-data text-[11px] text-neutral-500">{status === "loading" ? "Synthesizing" : "Ready"}</span>
                <span className={`font-mono-data text-[11px] ${liveStatus === "connected" ? "text-[#00E599]" : "text-neutral-500"}`}>
                  Live: {liveStatus}
                </span>
              </div>
            </div>
            <div className="font-mono-data text-[13px] text-on-surface whitespace-pre-wrap leading-relaxed min-h-[320px]">
              {plainReport || reportBody}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-grid-gutter">
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
              <div className="flex items-center justify-between mb-sm">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Inputs Snapshot</h3>
                <span className="text-[11px] text-zinc-500">
                  {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Waiting for live data"}
                </span>
              </div>
              {!activeInputs && (
                <p className="text-[12px] text-zinc-400">Waiting for inputs...</p>
              )}
              {activeInputs && (
                <div className="flex flex-col gap-md">
                  <div className="border border-[#262626] rounded-lg p-md bg-[#0F0F0F]">
                    <h4 className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Grid Score</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-white font-semibold">{activeInputs?.gridScore?.score ?? "--"}</span>
                      <span className="text-xs text-emerald-400">{activeInputs?.gridScore?.status ?? "--"}</span>
                    </div>
                    <div className="mt-2 text-[11px] text-zinc-500">{activeInputs?.gridScore?.lastUpdated ?? "--"}</div>
                    <ul className="mt-3 text-[11px] text-zinc-400 space-y-1 list-disc pl-4">
                      {(activeInputs?.gridScore?.reasons || []).map((reasonItem) => (
                        <li key={reasonItem}>{reasonItem}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-[#262626] rounded-lg p-md bg-[#0F0F0F]">
                    <h4 className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Overview</h4>
                    <div className="space-y-2">
                      {renderRow("Current Consumption", `${formatNumber(activeInputs?.overview?.metrics?.currentConsumptionMwh)} MWh`)}
                      {renderRow("Delta vs Baseline", formatPercent(activeInputs?.overview?.metrics?.currentConsumptionDeltaPct))}
                      {renderRow("Peak Demand", `${formatNumber(activeInputs?.overview?.metrics?.peakDemandTodayKw)} kW @ ${activeInputs?.overview?.metrics?.peakDemandTime ?? "--"}`)}
                      {renderRow("Forecasted 24h", `${formatNumber(activeInputs?.overview?.metrics?.forecasted24hMwh)} MWh (${activeInputs?.overview?.metrics?.forecastedCapacityPct ?? "--"}% capacity)`)}
                    </div>
                  </div>

                  <div className="border border-[#262626] rounded-lg p-md bg-[#0F0F0F]">
                    <h4 className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Forecast Summary</h4>
                    <div className="space-y-2">
                      {renderRow("24H Peak", `${formatNumber(activeInputs?.forecast?.next24h?.peakProjectionMw)} MW`)}
                      {renderRow("24H Confidence", `${activeInputs?.forecast?.next24h?.confidenceScorePct ?? "--"}%`)}
                      {renderRow("7D Peak", `${formatNumber(activeInputs?.forecast?.next7d?.peakProjectionMw)} MW`)}
                      {renderRow("7D Confidence", `${activeInputs?.forecast?.next7d?.confidenceScorePct ?? "--"}%`)}
                      {renderRow("30D Variance", `${activeInputs?.forecast?.next30d?.kpis?.[2]?.value ?? "--"}%`)}
                    </div>
                  </div>

                  <div className="border border-[#262626] rounded-lg p-md bg-[#0F0F0F]">
                    <h4 className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Historical Summary</h4>
                    <div className="space-y-2">
                      {renderRow("Current Month", `${formatNumber(activeInputs?.history?.currentMonthMwh)} MWh`)}
                      {renderRow("YoY Change", formatPercent(activeInputs?.history?.yoyChangePct))}
                      {renderRow("Peak Demand", `${formatNumber(activeInputs?.history?.peakDemandKw)} kW`)}
                      {renderRow("Carbon Offset", `${formatNumber(activeInputs?.history?.carbonOffsetKg)} kg CO2 (${activeInputs?.history?.carbonOffsetProgressPct ?? "--"}%)`)}
                    </div>
                  </div>

                  <div className="border border-[#262626] rounded-lg p-md bg-[#0F0F0F]">
                    <h4 className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Anomalies</h4>
                    <div className="text-[11px] text-zinc-500 mb-2">
                      Showing latest {Math.min(activeInputs?.anomalies?.length || 0, 5)} of {activeInputs?.anomalies?.length || 0}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] text-zinc-300">
                        <thead className="text-[10px] text-zinc-500 uppercase">
                          <tr className="border-b border-[#262626]">
                            <th className="py-1">Severity</th>
                            <th className="py-1">Timestamp</th>
                            <th className="py-1">Classification</th>
                            <th className="py-1">Delta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(activeInputs?.anomalies || []).slice(0, 5).map((item) => (
                            <tr key={item.id} className="border-b border-[#1F1F1F]">
                              <td className="py-1 pr-2">{item.severity}</td>
                              <td className="py-1 pr-2">{item.timestamp}</td>
                              <td className="py-1 pr-2">{item.classification}</td>
                              <td className="py-1">{item.delta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {chatOpen && (
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
                <div className="flex items-center justify-between mb-sm">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Chat Assist</h3>
                  <select
                    value={chatLanguage}
                    onChange={(event) => setChatLanguage(event.target.value)}
                    className="text-[11px] bg-[#0F0F0F] border border-[#262626] rounded px-2 py-1 text-zinc-300"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
                <div className="bg-[#0F0F0F] border border-[#262626] rounded-lg p-sm h-48 overflow-y-auto text-[12px] text-zinc-300 space-y-2">
                  {chatMessages.length === 0 && (
                    <p className="text-zinc-500">Ask about anomalies, forecast drivers, or grid score.</p>
                  )}
                  {chatMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={message.role === "user" ? "text-blue-300" : "text-zinc-200"}>
                      <span className="uppercase text-[10px] text-zinc-500 mr-2">{message.role}</span>
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-sm">
                  <input
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleChatSubmit();
                    }}
                    placeholder="Ask a question..."
                    className="flex-1 text-[12px] bg-[#0F0F0F] border border-[#262626] rounded px-3 py-2 text-zinc-200"
                  />
                  <button
                    type="button"
                    onClick={handleChatSubmit}
                    className="px-3 py-2 rounded bg-[#008CFF] text-white text-xs font-label-caps text-label-caps"
                    disabled={chatStatus === "loading"}
                  >
                    {chatStatus === "loading" ? "Sending" : "Send"}
                  </button>
                </div>
              </div>
            )}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Explainability</h3>
              {!activeInputs && (
                <p className="text-sm text-zinc-400">Waiting for inputs...</p>
              )}
              {activeInputs && explainability && (
                <div className="space-y-3 text-[12px] text-zinc-300">
                  <div>
                    <p className="text-zinc-500 uppercase text-[10px] mb-1">Anomaly Mix</p>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span>Critical: {explainability.anomalyCounts.CRITICAL}</span>
                      <span>Warning: {explainability.anomalyCounts.WARNING}</span>
                      <span>Info: {explainability.anomalyCounts.INFO}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase text-[10px] mb-1">Forecast Drivers</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {explainability.drivers.map((driver) => (
                        <li key={driver.driver}>{driver.driver}: {driver.impact}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase text-[10px] mb-1">Grid Score Reasons</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {explainability.gridReasons.map((reasonItem) => (
                        <li key={reasonItem}>{reasonItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
          <div className="lg:col-span-4 bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Anomalies by Severity</h3>
            <div className="flex items-end gap-3 h-32">
              {[
                { label: "Critical", value: anomalyCounts.CRITICAL, color: "bg-[#E82127]" },
                { label: "Warning", value: anomalyCounts.WARNING, color: "bg-[#f59e0b]" },
                { label: "Info", value: anomalyCounts.INFO, color: "bg-[#33A1FF]" },
              ].map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#0F0F0F] rounded-lg flex items-end h-full">
                    <div
                      className={`w-full rounded-lg ${item.color}`}
                      style={{ height: `${Math.max(10, item.value * 18)}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-zinc-400">{item.label}</span>
                  <span className="text-[11px] text-zinc-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Forecast Peaks</h3>
            <svg className="w-full h-32" viewBox="0 0 100 60" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#33A1FF"
                strokeWidth="2"
                points={forecastPeaks.map((item, index) => `${index * 50},${60 - Math.min(50, Number(item.value || 0) * 2)}`).join(" ")}
              />
            </svg>
            <div className="flex justify-between text-[11px] text-zinc-400">
              {forecastPeaks.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-zinc-200 space-y-1">
              {forecastPeaks.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span>{item.label}</span>
                  <span>{item.value ?? "--"} {item.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Grid Score Trend</h3>
            <svg className="w-full h-32" viewBox="0 0 100 60" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#00E599"
                strokeWidth="2"
                points={gridTrend.map((value, index) => `${(index / (gridTrend.length - 1)) * 100},${60 - (value - 80) * 2}`).join(" ")}
              />
            </svg>
            <div className="flex justify-between text-[11px] text-zinc-400">
              {gridTrend.map((value, index) => (
                <span key={`${value}-${index}`}>{value}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
          <div className="lg:col-span-6 bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Historical Signals</h3>
            <div className="space-y-3">
              {historicalBars.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}{item.unit}</span>
                  </div>
                  <div className="w-full bg-[#0F0F0F] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#33A1FF] h-full" style={{ width: `${Math.min(100, Math.abs(item.value))}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 bg-[#141414] border border-[#262626] rounded-xl p-lg gloss-shadow">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-sm">Explainability Drivers</h3>
            {activeInputs?.forecast?.next30d?.xaiDrivers?.map((driver) => (
              <div key={driver.driver} className="mb-3">
                <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                  <span>{driver.driver}</span>
                  <span>{driver.impact}</span>
                </div>
                <div className="w-full bg-[#0F0F0F] h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${driver.color}`} style={{ width: driver.impact }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
