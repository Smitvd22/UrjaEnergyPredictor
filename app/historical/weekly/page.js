import DashboardLayout from "@/components/DashboardLayout";

export const metadata = { title: "Urja – Historical Weekly View" };

export default function HistoricalWeeklyPage() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const currentData = [45, 62, 78, 55, 88, 72, 50];
  const prevData = [50, 58, 70, 60, 80, 65, 55];

  return (
    <DashboardLayout title="URJA">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="font-display-xl text-display-xl text-white">Historical Analysis</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">7-Day Consumption Pattern</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high rounded p-1 border border-outline-variant/30">
          <a href="/historical" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Daily</a>
          <a href="/historical/weekly" className="px-4 py-1.5 rounded bg-[#1F1F1F] text-primary-container font-label-caps text-label-caps shadow-sm machined-edge">Weekly</a>
          <a href="/historical/monthly" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Monthly</a>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter">
        {[
          { label: "Total Week", value: "892.4", unit: "MWh", icon: "calendar_today", color: "text-primary" },
          { label: "Daily Avg", value: "127.5", unit: "MWh", icon: "bar_chart", color: "text-tertiary" },
          { label: "Peak Day", value: "Friday", unit: "", icon: "star", color: "text-secondary" },
          { label: "Efficiency", value: "91", unit: "%", icon: "speed", color: "text-success-green" },
        ].map((k) => (
          <div key={k.label} className="bg-[#141414] border border-[#262626] rounded-xl p-lg relative overflow-hidden machined-edge gloss-shadow">
            <div className="flex justify-between items-start mb-md">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{k.label}</h3>
              <span className={`material-symbols-outlined ${k.color}`}>{k.icon}</span>
            </div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-xl text-display-xl text-on-background">{k.value}</span>
              {k.unit && <span className={`font-mono-data text-mono-data ${k.color}`}>{k.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg machined-edge gloss-shadow">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Week-over-Week Comparison</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 rounded-full bg-primary-container"></span>
              <span className="font-label-caps text-label-caps text-on-surface-variant text-xs">This Week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 rounded-full bg-outline-variant border border-dashed border-outline"></span>
              <span className="font-label-caps text-label-caps text-on-surface-variant text-xs">Last Week</span>
            </div>
          </div>
        </div>
        <div className="h-64 relative border-b border-l border-outline-variant/30 pb-8">
          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none pr-4">
            {["140k","120k","100k","80k","60k"].map(l => (
              <div key={l} className="flex items-center gap-2">
                <span className="text-[10px] text-outline font-mono-data w-8 text-right">{l}</span>
                <div className="flex-1 h-px bg-[#262626]/50"></div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pl-10 flex items-end gap-4 pb-2">
            {days.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full flex gap-0.5 items-end" style={{height: "90%"}}>
                  <div className="flex-1 bg-primary-container/80 rounded-t-sm hover:bg-primary-container transition-colors" style={{height: `${currentData[i]}%`}}></div>
                  <div className="flex-1 bg-outline-variant/50 rounded-t-sm border-t border-dashed border-outline/30" style={{height: `${prevData[i]}%`}}></div>
                </div>
                <span className="text-[10px] text-outline font-mono-data">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* XAI Analysis */}
      <div className="bg-[#1F1F1F] border border-[#008CFF]/20 rounded-xl p-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#008CFF] to-transparent opacity-50"></div>
        <div className="flex items-center gap-sm mb-md">
          <span className="material-symbols-outlined text-[#008CFF]">psychology</span>
          <h3 className="font-label-caps text-label-caps text-[#008CFF] uppercase tracking-widest">XAI Weekly Analysis</h3>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
          Friday's peak was driven by a <span className="text-[#E82127] font-mono-data">+12%</span> surge in industrial loads from the manufacturing district. Saturday shows a natural weekend reduction pattern consistent with historical data.
        </p>
      </div>
    </DashboardLayout>
  );
}
