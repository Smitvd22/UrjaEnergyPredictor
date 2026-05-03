import "./globals.css";

export const metadata = {
  title: "Urja – Energy Forecasting Dashboard",
  description: "Precision telemetry and energy analytics platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" />
      </head>
      <body className="bg-[#0A0A0A] text-on-background antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
