import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        <TopBar title={title} />
        <div className="p-grid-margin pt-24 max-w-7xl mx-auto w-full flex flex-col gap-lg pb-grid-margin">
          {children}
        </div>
      </main>
    </div>
  );
}
