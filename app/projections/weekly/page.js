import DashboardLayout from "@/components/DashboardLayout";

export const metadata = { title: "Urja – 7-Day Projections" };

export default function ProjectionsWeeklyPage() {
  return (
    <DashboardLayout title="URJA">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-display-xl text-display-xl text-white">Projections Center</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">7-Day Predictive Consumption Vector</p>
        </div>
        <div className="flex items-center gap-2 bg-[#141414] p-1 rounded-lg border border-[#262626]">
          <a href="/projections" className="px-4 py-2 font-label-caps text-label-caps text-neutral-400 hover:text-white rounded-md transition-colors">24H</a>
          <a href="/projections/weekly" className="px-4 py-2 font-label-caps text-label-caps bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-md">7D</a>
          <a href="/projections/monthly" className="px-4 py-2 font-label-caps text-label-caps text-neutral-400 hover:text-white rounded-md transition-colors">30D</a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Primary Chart */}
        <div className="lg:col-span-8 bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col gap-6 card-edge gloss-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex justify-between items-center">
            <h3 className="font-label-caps text-label-caps text-neutral-400 tracking-widest uppercase">Projected Load Vector</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-mono-data text-mono-data text-blue-500">Live Synthesis</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px] relative border-b border-l border-[#262626] flex items-end pt-4 pr-4">
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              {[0,1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white"></div>)}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-blue-500/5 to-blue-500/20" style={{clipPath:"polygon(0 80%, 14% 75%, 28% 85%, 42% 60%, 57% 40%, 71% 50%, 85% 20%, 100% 30%, 100% 100%, 0 100%)"}}></div>
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="drop-shadow-[0_0_8px_rgba(0,140,255,0.8)]" d="M0,80 Q7,78 14,75 T28,85 T42,60 T57,40 T71,50 T85,20 T100,30" fill="none" stroke="#008CFF" strokeWidth="0.5"></path>
              <circle cx="42" cy="60" fill="#008CFF" r="1" className="animate-pulse"></circle>
              <circle cx="85" cy="20" fill="#E82127" r="1"></circle>
            </svg>
            <div className="absolute -bottom-6 left-0 w-full flex justify-between font-mono-data text-[10px] text-neutral-500">
              {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
          <div className="flex gap-8 mt-4 pt-4 border-t border-[#262626]">
            <div>
              <p className="font-label-caps text-[10px] text-neutral-500 uppercase">Peak Projection</p>
              <p className="font-mono-data text-headline-md text-white mt-1">14.2 <span className="text-sm text-neutral-500">MW</span></p>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-neutral-500 uppercase">Confidence Score</p>
              <p className="font-mono-data text-headline-md text-[#00E599] mt-1">94.8%</p>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-4 flex flex-col gap-grid-gutter">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col gap-4 card-edge gloss-shadow flex-1">
            <div className="flex items-center gap-2 border-b border-[#262626] pb-3">
              <span className="material-symbols-outlined text-blue-500">psychology</span>
              <h3 className="font-label-caps text-label-caps text-neutral-200 uppercase tracking-wider">XAI Diagnostics</h3>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto pr-2">
              <div className="bg-[#1F1F1F] p-3 rounded-lg border border-[#262626] relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E82127]"></div>
                <div className="flex items-start gap-3 ml-2">
                  <span className="material-symbols-outlined text-[#E82127] text-xl mt-0.5">severe_cold</span>
                  <div>
                    <h4 className="font-mono-data text-[12px] text-white">Weather Anomaly Detected</h4>
                    <p className="font-body-sm text-[13px] text-neutral-400 mt-1 leading-relaxed">Cold front starting Wednesday will drive a <strong className="text-[#E82127]">15% increase</strong> in heating load across Sector 4.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1F1F1F] p-3 rounded-lg border border-[#262626] relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div className="flex items-start gap-3 ml-2">
                  <span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">factory</span>
                  <div>
                    <h4 className="font-mono-data text-[12px] text-white">Industrial Shift Modification</h4>
                    <p className="font-body-sm text-[13px] text-neutral-400 mt-1 leading-relaxed">Manufacturing plant Alpha shifting to high-capacity mode on Friday; +4.2 MW baseline shift expected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-md flex flex-col justify-center card-edge gloss-shadow min-h-[120px]">
            <h3 className="font-label-caps text-label-caps text-neutral-400 uppercase tracking-wider mb-2">Weekly Variance</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-mono-data text-headline-lg text-[#E82127]">+8.4%</span>
              <span className="font-mono-data text-sm text-neutral-500">vs Prev. 7D</span>
            </div>
            <div className="w-full h-1 bg-[#1F1F1F] rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-[#E82127]" style={{width: "65%"}}></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
