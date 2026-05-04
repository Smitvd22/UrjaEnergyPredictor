import DashboardLayout from "@/components/DashboardLayout";

export const metadata = { title: "Urja – 30-Day Projections" };

export default function ProjectionsMonthlyPage() {
  const weeks = ["W1","W2","W3","W4","W5"];
  const forecastData = [55, 72, 88, 65, 80];

  return (
    <DashboardLayout title="URJA">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-display-xl text-display-xl text-white">Projections Center</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">30-Day Extended Projections Model</p>
        </div>
        <div className="flex items-center gap-2 bg-[#141414] p-1 rounded-lg border border-[#262626]">
          <a href="/projections" className="px-4 py-2 font-label-caps text-label-caps text-neutral-400 hover:text-white rounded-md transition-colors">24H</a>
          <a href="/projections/weekly" className="px-4 py-2 font-label-caps text-label-caps text-neutral-400 hover:text-white rounded-md transition-colors">7D</a>
          <a href="/projections/monthly" className="px-4 py-2 font-label-caps text-label-caps bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-md">30D</a>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        {[
          { label: "Monthly Projected", value: "3,840", unit: "MWh", icon: "calendar_month", color: "text-primary" },
          { label: "Confidence Score", value: "87.4", unit: "%", icon: "verified", color: "text-tertiary" },
          { label: "Variance vs Last Month", value: "+6.1", unit: "%", icon: "trending_up", color: "text-secondary" },
        ].map(k => (
          <div key={k.label} className="bg-[#141414] border border-[#262626] rounded-xl p-lg machined-edge gloss-shadow">
            <div className="flex justify-between items-start mb-md">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{k.label}</h3>
              <span className={`material-symbols-outlined ${k.color}`}>{k.icon}</span>
            </div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">{k.value}</span>
              <span className={`font-mono-data text-mono-data ${k.color}`}>{k.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg card-edge gloss-shadow">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">30-Day Projected Load</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-mono-data text-mono-data text-blue-500">AI Model Active</span>
          </div>
        </div>
        <div className="h-64 relative border-b border-l border-[#262626]">
          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
            {[0,1,2,3].map(i => <div key={i} className="w-full h-px bg-white"></div>)}
          </div>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="projectionsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#008CFF" stopOpacity="0.3"></stop>
                <stop offset="100%" stopColor="#008CFF" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M0,45 Q10,38 20,42 T40,28 T60,35 T80,18 T100,25 L100,100 L0,100 Z" fill="url(#projectionsGrad)"></path>
            <path d="M0,45 Q10,38 20,42 T40,28 T60,35 T80,18 T100,25" fill="none" stroke="#008CFF" strokeWidth="1" strokeDasharray="4,2" vectorEffect="non-scaling-stroke"></path>
            {/* Confidence band */}
            <path d="M0,40 Q10,33 20,37 T40,23 T60,30 T80,13 T100,20 L100,30 T80,23 T60,40 T40,33 T20,47 Q10,43 0,50 Z" fill="#008CFF" fillOpacity="0.08"></path>
          </svg>
          <div className="absolute -bottom-6 left-0 w-full flex justify-between font-mono-data text-[10px] text-neutral-500 px-2">
            {Array.from({length:7},(_,i) => `Day ${i*5+1}`).map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>

      {/* XAI Analysis */}
      <div className="bg-[#1F1F1F] border border-[#008CFF]/20 rounded-xl p-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#008CFF] to-transparent opacity-50"></div>
        <div className="flex items-center gap-sm mb-md">
          <span className="material-symbols-outlined text-[#008CFF]">psychology</span>
          <h3 className="font-label-caps text-label-caps text-[#008CFF] uppercase tracking-widest">XAI 30-Day Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            The model predicts a <span className="text-[#E82127] font-mono-data">peak around Day 22</span> driven by projected extreme weather conditions and scheduled industrial ramp-up at Sector 7.
          </p>
          <div className="space-y-sm">
            {[
              { driver: "Weather Events", impact: "42%", color: "bg-[#E82127]" },
              { driver: "Industrial Load", impact: "31%", color: "bg-blue-500" },
              { driver: "Seasonal Baseline", impact: "27%", color: "bg-tertiary" },
            ].map(d => (
              <div key={d.driver}>
                <div className="flex justify-between text-[11px] font-mono-data mb-1">
                  <span className="text-on-surface-variant">{d.driver}</span>
                  <span className="text-on-surface">{d.impact}</span>
                </div>
                <div className="w-full h-1 bg-[#262626] rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{width: d.impact}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
