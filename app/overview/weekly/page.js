"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function OverviewPage() {
  const [loadFactor, setLoadFactor] = useState(70.0);
  const [volatility, setVolatility] = useState(0.04);
  const [rampRate, setRampRate] = useState(1.2);
  const [currentConsumption, setCurrentConsumption] = useState(1025.5);
  const [currentBars, setCurrentBars] = useState([45, 60, 50, 70, 80, 65, 55]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadFactor(prev => Math.max(50, Math.min(90, prev + (Math.random() * 4 - 2))));
      setVolatility(prev => Math.max(0.01, Math.min(0.1, prev + (Math.random() * 0.01 - 0.005))));
      setRampRate(prev => Math.max(0.5, Math.min(3.0, prev + (Math.random() * 0.4 - 0.2))));
      setCurrentConsumption(prev => Math.max(100, prev + (Math.random() * 4 - 2)));
      
      setCurrentBars(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.max(20, Math.min(100, next[next.length - 1] + (Math.random() * 20 - 10))));
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title="URJA">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Grid Risk Score Calculator</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-base">Real-time grid stress indicator to prevent outages.</p>
        </div>
        <div className="flex items-center gap-sm bg-[#141414] px-md py-sm rounded-full border border-[#262626]">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-mono-data text-mono-data text-tertiary">Risk: Stable (15/100)</span>
        </div>
      </div>

      {/* Grid Risk Score Parameters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-grid-gutter mb-xl">
        {/* Load Factor */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col justify-between relative shadow-[0_4px_15px_-10px_rgba(0,0,0,0.4)]">
          <div className="flex justify-between items-center mb-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Load Factor</h3>
            <span className="material-symbols-outlined text-primary text-sm">battery_5_bar</span>
          </div>
          <div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-md text-display-md text-on-background">{loadFactor.toFixed(1)}</span>
              <span className="font-mono-data text-mono-data text-primary">%</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs text-xs">Safe capacity proximity</p>
          </div>
        </div>

        {/* Volatility */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col justify-between relative shadow-[0_4px_15px_-10px_rgba(0,0,0,0.4)]">
          <div className="flex justify-between items-center mb-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Volatility</h3>
            <span className="material-symbols-outlined text-secondary text-sm">multiline_chart</span>
          </div>
          <div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-md text-display-md text-on-background">{volatility.toFixed(3)}</span>
              <span className="font-mono-data text-mono-data text-secondary">CV</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs text-xs">Rolling variation</p>
          </div>
        </div>

        {/* Ramp Rate */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col justify-between relative shadow-[0_4px_15px_-10px_rgba(0,0,0,0.4)]">
          <div className="flex justify-between items-center mb-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Ramp Rate</h3>
            <span className="material-symbols-outlined text-tertiary text-sm">speed</span>
          </div>
          <div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-md text-display-md text-on-background">{rampRate.toFixed(2)}</span>
              <span className="font-mono-data text-mono-data text-tertiary">MW/h</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs text-xs">Demand surge rate</p>
          </div>
        </div>

        {/* Anomaly Flag */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col justify-between relative shadow-[0_4px_15px_-10px_rgba(0,0,0,0.4)]">
          <div className="flex justify-between items-center mb-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Flux Event Flag</h3>
            <span className="material-symbols-outlined text-outline text-sm">flag</span>
          </div>
          <div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-md text-display-md text-on-background">0</span>
              <span className="font-mono-data text-mono-data text-outline">Normal</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs text-xs">Detector output</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        {/* Current Consumption */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Current Weekly Consumption</h3>
            <span className="material-symbols-outlined text-primary">bolt</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">{currentConsumption.toFixed(1)}</span>
              <span className="font-mono-data text-mono-data text-primary">MWh</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-tertiary">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span className="font-body-sm text-body-sm">-2.4% vs baseline</span>
            </div>
          </div>
        </div>

        {/* Peak Demand */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Peak Demand This Week</h3>
            <span className="material-symbols-outlined text-secondary">insights</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">8.4</span>
              <span className="font-mono-data text-mono-data text-secondary">kW</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="font-body-sm text-body-sm">Recorded at 14:30</span>
            </div>
          </div>
        </div>

        {/* Forecasted */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Projected 7D Total</h3>
            <span className="material-symbols-outlined text-outline">online_prediction</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">21,500</span>
              <span className="font-mono-data text-mono-data text-outline">MWh</span>
            </div>
            <div className="w-full bg-[#1F1F1F] h-1.5 rounded-full mt-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#008CFF] to-[#33A1FF] w-[75%] h-full rounded-full"></div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm text-right">75% capacity</p>
          </div>
        </div>
      </div>

      {/* AI Analytics & Optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid-gutter mt-xl mb-xl">
        {/* Cost Savings Optimizer */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Cost Savings Optimizer</h3>
            <span className="material-symbols-outlined text-green-500">savings</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">$16.5</span>
              <span className="font-mono-data text-mono-data text-green-500">k</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-body-sm text-body-sm">Potential annual savings</span>
            </div>
          </div>
        </div>

        {/* Peak Load Early Warning */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Peak Load Early Warning</h3>
            <span className="material-symbols-outlined text-secondary">warning</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">Friday 14:30</span>
              <span className="font-mono-data text-mono-data text-secondary">EST</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-secondary">
              <span className="material-symbols-outlined text-sm">priority_high</span>
              <span className="font-body-sm text-body-sm">85% probability of surge</span>
            </div>
          </div>
        </div>

        {/* Energy Efficiency Index */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Energy Efficiency Index</h3>
            <span className="material-symbols-outlined text-primary">energy_savings_leaf</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">92</span>
              <span className="font-mono-data text-mono-data text-outline">/ 100</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-primary">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span className="font-body-sm text-body-sm">Optimal performance</span>
            </div>
          </div>
        </div>

        {/* Yearly Predictions */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-xl">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Yearly Predictions</h3>
            <span className="material-symbols-outlined text-tertiary">query_stats</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">1.2</span>
              <span className="font-mono-data text-mono-data text-tertiary">GWh</span>
            </div>
            <div className="flex items-center gap-xs mt-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span className="font-body-sm text-body-sm">Expected weekly consumption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#262626] rounded-xl p-lg relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)] flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="flex justify-between items-center mb-lg relative z-10">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Current vs Historical Baseline</h3>
            <div className="flex gap-sm">
              <div className="flex items-center gap-xs">
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Current</span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="w-3 h-3 rounded-sm bg-surface-variant border border-outline-variant"></span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Baseline</span>
              </div>
            </div>
          </div>
          {/* Chart Visualization */}
          <div className="flex-1 min-h-[300px] w-full relative z-10 bg-[#1F1F1F] rounded-lg border border-[#262626] overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 opacity-50" style={{backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=\")"}}></div>
            {/* Baseline bars */}
            <div className="w-full h-full p-4 flex items-end gap-2 relative z-10">
              {[30, 45, 60, 40, 70, 85, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-surface-variant/50 rounded-t-sm" style={{height: `${h}%`}}></div>
              ))}
            </div>
            {/* Current bars */}
            <div className="absolute w-full h-full p-4 flex items-end gap-2 z-20">
              {currentBars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i === 5 ? "bg-secondary/80 border-t border-secondary shadow-[0_0_10px_rgba(255,180,172,0.3)]" : "bg-primary/80 shadow-[0_0_10px_rgba(166,200,255,0.3)] hover:bg-primary"} rounded-t-sm transition-colors relative`}
                  style={{height: `${h}%`}}
                >
                  {i === 5 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-secondary font-mono-data opacity-0 group-hover:opacity-100 transition-opacity">PEAK</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Anomalies */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)] flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
          <div className="flex justify-between items-center mb-lg relative z-10 border-b border-zinc-800/50 pb-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Recent Flux Events</h3>
            <button className="text-xs text-primary hover:text-primary-container font-mono-data transition-colors">View All</button>
          </div>
          <div className="flex flex-col gap-sm relative z-10 flex-1 overflow-y-auto">
            {/* Critical */}
            <div className="bg-[#1F1F1F] rounded-lg p-sm border border-secondary/20 flex gap-sm items-start hover:bg-surface-container-high transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[18px]">warning</span>
              </div>
              <div>
                <h4 className="font-mono-data text-mono-data text-on-background text-sm">Voltage Drop - Node Alpha</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-base">-15% variance detected</p>
                <span className="font-mono-data text-mono-data text-outline text-[10px] block mt-xs">10:42 AM</span>
              </div>
            </div>
            {/* Warning */}
            <div className="bg-[#1F1F1F] rounded-lg p-sm border border-yellow-500/20 flex gap-sm items-start hover:bg-surface-container-high transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-yellow-500 text-[18px]">info</span>
              </div>
              <div>
                <h4 className="font-mono-data text-mono-data text-on-background text-sm">Flow Restriction</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-base">Sector 7g line pressure</p>
                <span className="font-mono-data text-mono-data text-outline text-[10px] block mt-xs">09:15 AM</span>
              </div>
            </div>
            {/* Resolved */}
            <div className="bg-[#1F1F1F] rounded-lg p-sm border border-tertiary/20 flex gap-sm items-start hover:bg-surface-container-high transition-colors cursor-pointer opacity-60">
              <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              </div>
              <div>
                <h4 className="font-mono-data text-mono-data text-on-background text-sm line-through decoration-outline">Sync Error</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-base">Telemetry cluster 4 restored</p>
                <span className="font-mono-data text-mono-data text-outline text-[10px] block mt-xs">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
