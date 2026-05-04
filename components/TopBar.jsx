"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const timeTabs = {
  "/": [
    { label: "Daily", href: "/" },
    { label: "Weekly", href: "/overview/weekly" },
    { label: "Monthly", href: "/overview/monthly" },
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
      <div className="flex items-center gap-md">
        <button className="p-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-surface-container relative">
          <span className="material-symbols-outlined">notifications_active</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-tesla-red rounded-full pulse-critical"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">account_circle</span>
        </div>
      </div>
    </header>
  );
}
