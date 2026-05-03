"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview", icon: "grid_view" },
  { href: "/historical", label: "Historical", icon: "history" },
  { href: "/forecast", label: "Forecast", icon: "query_stats" },
  { href: "/anomalies", label: "Anomalies", icon: "error" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-zinc-800 bg-[#0A0A0A] shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)] z-50">
      {/* Logo */}
      <div className="p-lg border-b border-zinc-800/50 flex flex-col gap-sm">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white italic">Urja</h1>
            <p className="tracking-tight text-xs font-semibold uppercase text-zinc-500">Precision Telemetry</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-md flex flex-col gap-base px-sm">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-md px-md py-sm rounded-md transition-all duration-200 group ${
                isActive
                  ? "text-blue-500 bg-blue-500/10 border-r-2 border-blue-500"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <span className="font-mono-data text-mono-data">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-lg border-t border-zinc-800/50 flex flex-col gap-sm">
        <button className="w-full py-sm bg-[#008CFF] hover:bg-blue-600 text-white font-label-caps text-label-caps rounded-md transition-colors bg-gradient-to-b from-[#33A1FF] to-[#008CFF] shadow-lg shadow-blue-900/20">
          SYSTEM EXPORT
        </button>
        <div className="flex flex-col gap-base mt-md">
          <Link href="#" className="flex items-center gap-md px-md py-sm rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-all duration-200">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span className="font-mono-data text-mono-data text-xs">Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-md px-md py-sm rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-all duration-200">
            <span className="material-symbols-outlined text-sm">help</span>
            <span className="font-mono-data text-mono-data text-xs">Support</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
