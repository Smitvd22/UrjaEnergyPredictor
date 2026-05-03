import DashboardLayout from "@/components/DashboardLayout";

export const metadata = { title: "Urja – Historical Monthly View" };

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const monthlyData = [68,72,85,78,90,95,88,82,75,80,65,70];

export default function HistoricalMonthlyPage() {
  return (
    <DashboardLayout title="URJA">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="font-display-xl text-display-xl text-white">Historical Analysis</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">12-Month Annual Consumption View</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high rounded p-1 border border-outline-variant/30">
          <a href="/historical" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Daily</a>
          <a href="/historical/weekly" className="px-4 py-1.5 rounded bg-transparent text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface transition-colors">Weekly</a>
          <a href="/historical/monthly" className="px-4 py-1.5 rounded bg-[#1F1F1F] text-primary-container font-label-caps text-label-caps shadow-sm machined-edge">Monthly</a>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        {[
          { label: "Annual Total", value: "14.8", unit: "GWh", icon: "bolt", color: "text-primary" },
          { label: "Peak Month", value: "June", unit: "", icon: "thermostat", color: "text-secondary" },
          { label: "YoY Change", value: "-3.2", unit: "%", icon: "trending_down", color: "text-tertiary" },
        ].map((k) => (
          <div key={k.label} className="bg-[#141414] border border-[#262626] rounded-xl p-lg machined-edge gloss-shadow">
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

      {/* Annual Chart */}
      <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg machined-edge gloss-shadow">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Annual Consumption by Month (MWh)</h3>
        </div>
        <div className="h-72 relative border-b border-l border-outline-variant/30 pl-10 pb-8">
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between">
            {["100","80","60","40","20","0"].map(l => (
              <span key={l} className="text-[10px] text-outline font-mono-data w-8 text-right">{l}</span>
            ))}
          </div>
          <div className="absolute inset-0 pl-10 pb-8 flex items-end gap-2">
            {months.map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className={`w-full rounded-t-sm transition-all hover:opacity-80 ${monthlyData[i] === Math.max(...monthlyData) ? "bg-secondary/80" : "bg-primary-container/70"}`}
                  style={{height: `${monthlyData[i]}%`}}
                ></div>
                <span className="text-[9px] text-outline font-mono-data">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
