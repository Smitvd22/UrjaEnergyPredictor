export default function KPICard({ title, value, unit, icon, trend, trendValue, trendLabel, extra, iconColor = "text-primary" }) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none border-t border-white/5 rounded-t-xl"></div>
      <div className="relative z-10 flex justify-between items-start mb-xl">
        <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">{title}</h3>
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-baseline gap-sm">
          <span className="font-display-xl text-display-xl text-on-background">{value}</span>
          <span className={`font-mono-data text-mono-data ${iconColor}`}>{unit}</span>
        </div>
        {trend && (
          <div className={`flex items-center gap-xs mt-sm ${trendValue?.startsWith("+") ? "text-tesla-red" : "text-tertiary"}`}>
            <span className="material-symbols-outlined text-sm">{trend}</span>
            <span className="font-body-sm text-body-sm">{trendValue} {trendLabel}</span>
          </div>
        )}
        {extra && <div className="mt-sm">{extra}</div>}
      </div>
    </div>
  );
}
