import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: "Urja – Historical Analysis",
  description: "Monthly historical energy consumption analysis.",
};

export default function HistoricalPage() {
  return (
    <DashboardLayout title="URJA">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="font-display-xl text-display-xl text-white">Historical Analysis</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Monthly Consumption vs. Previous Year</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high rounded p-1 border border-outline-variant/30">
          <a href="/historical" className="px-4 py-1.5 rounded bg-[#1F1F1F] text-primary-container font-label-caps text-label-caps shadow-sm machined-edge">Daily</a>
          <a href="/historical/weekly" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Weekly</a>
          <a href="/historical/monthly" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Monthly</a>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Main Chart - 8 cols */}
        <div className="lg:col-span-8 bg-[#141414] border border-[#262626] rounded-lg p-lg relative overflow-hidden gloss-shadow machined-edge flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-widest mb-1">Consumption vs Prev. Year</h3>
              <div className="flex items-baseline gap-3">
                <span className="font-display-xl text-display-xl text-on-surface">1.24 <span className="text-headline-md font-headline-md text-on-surface-variant">MWh</span></span>
                <span className="flex items-center text-tertiary-fixed-dim text-sm font-medium bg-tertiary-fixed-dim/10 px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span> 4.2%
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 rounded-full bg-primary-container"></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Oct 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 rounded-full bg-outline-variant border border-dashed border-outline"></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Oct 2022</span>
              </div>
            </div>
          </div>
          {/* Chart Area */}
          <div className="flex-1 relative w-full mt-4 flex items-end border-b border-l border-outline-variant/30 pb-2 pl-8">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-outline font-mono-data h-full pb-2">
              <span>60k</span><span>40k</span><span>20k</span><span>0</span>
            </div>
            {/* XAI Insight */}
            <div className="absolute top-1/4 right-8 bg-[#1F1F1F]/90 backdrop-blur-md border border-primary-container/30 p-4 rounded-lg shadow-2xl max-w-xs machined-edge z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary-container text-sm">psychology</span>
                <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-wider">XAI Insight</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                Overall efficiency improved by 4% compared to last October due to optimized HVAC scheduling during peak tariff hours.
              </p>
            </div>
            {/* Mock chart bars */}
            <div className="w-full h-[80%] flex items-end gap-2 px-4">
              {[45, 62, 38, 70, 55, 80, 48, 65, 72, 58, 42, 76].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
                  <div className="w-full bg-primary-container/40 rounded-t-sm" style={{height: `${h * 0.85}%`}}></div>
                  <div className="w-full bg-outline-variant/40 rounded-t-sm border border-dashed border-outline/30" style={{height: `${h}%`}}></div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-[-24px] left-8 right-0 flex justify-between text-[10px] text-outline font-mono-data">
              {["01","05","10","15","20","25","31"].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>

        {/* Side Stats - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-grid-gutter">
          {/* Peak Demand Card */}
          <div className="bg-[#141414] border border-[#262626] rounded-lg p-md machined-edge gloss-shadow flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-sm">electric_meter</span>
              <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest">Peak Demand</h4>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-headline-lg text-headline-lg text-on-surface">42.8 <span className="text-body-sm font-body-sm text-on-surface-variant">kW</span></div>
                <div className="font-mono-data text-mono-data text-outline mt-1">Oct 14, 14:30 EST</div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-[#1F1F1F]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="50, 100" strokeWidth="4"></path>
                  <path className="text-secondary-fixed-dim" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="40, 100" strokeWidth="4"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-secondary-fixed-dim font-mono-data text-[10px]">85%</div>
              </div>
            </div>
          </div>

          {/* Carbon Offset */}
          <div className="bg-[#141414] border border-[#262626] rounded-lg p-md machined-edge gloss-shadow flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">eco</span>
              <h4 className="font-label-caps text-label-caps text-outline uppercase tracking-widest">Carbon Offset</h4>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface mb-2">850 <span className="text-body-sm font-body-sm text-on-surface-variant">kg CO2</span></div>
            <div className="w-full bg-[#1F1F1F] h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary-fixed-dim h-full w-[70%]"></div>
            </div>
            <div className="flex justify-between mt-2 font-mono-data text-[10px] text-outline">
              <span>Progress to Target</span>
              <span className="text-tertiary-fixed-dim">70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-[#141414] border border-[#262626] rounded-lg machined-edge gloss-shadow overflow-hidden">
        <div className="p-4 border-b border-[#262626] flex justify-between items-center">
          <h4 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Subsystem Breakdown</h4>
          <button className="text-primary-container font-label-caps text-label-caps hover:text-primary-fixed transition-colors">View All Details</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F1F1F] font-label-caps text-label-caps text-outline border-b border-[#262626]">
                <th className="p-4 font-semibold uppercase tracking-wider">System</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Usage (MWh)</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Variance (YoY)</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-mono-data text-on-surface divide-y divide-[#262626]">
              {[
                { icon: "ac_unit", name: "HVAC", usage: "0.65", variance: "-8.5%", status: "Optimal", statusColor: "text-tertiary-fixed-dim", bgColor: "bg-tertiary-fixed-dim/10" },
                { icon: "lightbulb", name: "Lighting", usage: "0.22", variance: "-1.2%", status: "Normal", statusColor: "text-on-surface-variant", bgColor: "bg-outline-variant/30" },
                { icon: "computer", name: "Servers", usage: "0.37", variance: "+2.1%", status: "Warning", statusColor: "text-yellow-500", bgColor: "bg-yellow-500/10" },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-[#1A1A1A] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">{row.icon}</span>
                    {row.name}
                  </td>
                  <td className="p-4">{row.usage}</td>
                  <td className={`p-4 ${row.variance.startsWith("-") ? "text-tertiary-fixed-dim" : "text-yellow-500"}`}>{row.variance}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 ${row.bgColor} ${row.statusColor} px-2 py-1 rounded-full text-[10px] uppercase tracking-wider`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.bgColor.replace("bg-", "bg-").replace("/10", "").replace("/30", "")}`}></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Log */}
      <div className="bg-[#0A0A0A] border-t border-[#262626] p-4 font-mono-data text-[11px] text-outline opacity-70 rounded-lg">
        <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
          <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
          <span>SYSTEM.LOG / REALTIME_TAIL</span>
        </div>
        <div className="flex flex-col gap-1">
          <p>[15:42:01] INFO: HVAC subsystem optimized parameters applied successfully.</p>
          <p>[15:45:33] WARN: Minor voltage fluctuation detected on Grid-B. Compensating...</p>
          <p className="text-tertiary-fixed-dim">[15:45:35] SUCCESS: Grid-B stabilized. Operations normal.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
