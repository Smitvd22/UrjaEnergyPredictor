"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const timeTabs = {
  "/": [
    { label: "Daily", href: "/" },
    { label: "Weekly", href: "/overview/weekly" },
    { label: "Monthly", href: "/overview/monthly" },
    { label: "Yearly", href: "/overview/yearly" },
  ],
  "/historical": [
    { label: "Daily", href: "/historical" },
    { label: "Weekly", href: "/historical/weekly" },
    { label: "Monthly", href: "/historical/monthly" },
  ],
  "/projections": [
    { label: "24H", href: "/projections" },
    { label: "7D", href: "/projections/weekly" },
    { label: "30D", href: "/projections/monthly" },
  ],
  "/flux-events": [],
};

export default function TopBar({ title = "URJA" }) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const basePath = "/" + (pathname.split("/")[1] || "");
  const tabs = timeTabs[basePath] || timeTabs["/"];

  return (
    <header className="bg-[#0A0A0A]/80 backdrop-blur-xl fixed top-0 right-0 w-[calc(100%-16rem)] z-40 flex justify-between items-center px-8 h-16 border-b border-zinc-800/50 shadow-lg shadow-black/20">
      <div className="flex items-center gap-xl">
        <span className="text-lg font-black text-white tracking-widest uppercase">{title}</span>
        {tabs.length > 0 && (
          <div className="hidden lg:flex gap-lg">
            {tabs.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-all ${
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500 pb-2"
                      : "text-zinc-400 hover:text-blue-400"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex items-center gap-md relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-surface-container relative"
        >
          <span className="material-symbols-outlined">notifications_active</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-tesla-red rounded-full pulse-critical"></span>
        </button>
        
        {/* Notification Popup */}
        {showNotifications && (
          <div className="absolute top-full right-12 mt-2 w-80 bg-[#141414] border border-[#262626] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-[#1F1F1F]">
              <h3 className="font-label-caps text-label-caps text-white">System Alerts</h3>
              <span className="text-xs font-mono-data text-tesla-red bg-tesla-red/10 px-2 py-0.5 rounded-full">3 Critical</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-3 border-b border-zinc-800/50 hover:bg-surface-container-high transition-colors cursor-pointer border-l-4 border-l-tesla-red">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tesla-red mt-0.5">warning</span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">CRITICAL: Reactor Core Temp Exceeding 10,000K!</h4>
                    <p className="text-xs text-zinc-400 mt-1">Imminent Meltdown in Sector 7G. Evacuate immediately.</p>
                    <span className="text-[10px] font-mono-data text-zinc-500 mt-2 block">Just now</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-zinc-800/50 hover:bg-surface-container-high transition-colors cursor-pointer border-l-4 border-l-yellow-500">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-500 mt-0.5">electric_bolt</span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">ALERT: Energy Surge of 1.21 Gigawatts</h4>
                    <p className="text-xs text-zinc-400 mt-1">Flux Capacitor is out of sync. Prepare for temporal displacement.</p>
                    <span className="text-[10px] font-mono-data text-zinc-500 mt-2 block">2 mins ago</span>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-surface-container-high transition-colors cursor-pointer border-l-4 border-l-orange-500">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-orange-500 mt-0.5">crisis_alert</span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">WARNING: Alien Signature Detected</h4>
                    <p className="text-xs text-zinc-400 mt-1">Unidentified massive energy drain at orbital platform Delta.</p>
                    <span className="text-[10px] font-mono-data text-zinc-500 mt-2 block">15 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">account_circle</span>
        </div>
      </div>
    </header>
  );
}
