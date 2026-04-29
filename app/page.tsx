"use client";

import React, { useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import { useF1Store } from "@/store/f1Store";
import { Bell } from "lucide-react";

function DataSimulator() {
  const { updateTelemetry, isLive, drivers, selectedDriver } = useF1Store();

  useEffect(() => {
    if (!isLive) return;

    let time = 0;
    const interval = setInterval(() => {
      time += 0.5;

      const baseSpeed = 200;
      const speedVariation = Math.sin(time) * 100 + Math.sin(time * 0.5) * 50; 
      const currentSpeed = Math.max(80, Math.min(340, baseSpeed + speedVariation));

      const gear = Math.max(1, Math.min(8, Math.floor(currentSpeed / 40)));
      const rpm = Math.max(4000, Math.min(12500, (currentSpeed % 40) * 200 + 4000));
      const throttle = currentSpeed > 150 ? 100 : Math.max(0, (currentSpeed / 150) * 100);
      const brake = Math.sin(time) < -0.5 ? 80 : 0;
      const drs = currentSpeed > 280 && throttle === 100;

      updateTelemetry({
        time,
        speed: Math.floor(currentSpeed),
        gear,
        rpm: Math.floor(rpm),
        throttle: Math.floor(throttle),
        brake: Math.floor(brake),
        drs,
      });

    }, 500);

    return () => clearInterval(interval);
  }, [isLive, updateTelemetry]);

  return null;
}

export default function App() {
  const { sessionName, trackName } = useF1Store();
  const [time, setTime] = React.useState<string>("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0A0A0B] text-gray-100 font-sans p-4 border border-gray-800">
      <DataSimulator />
      
      {/* Top Navbar */}
      <header className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3 shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black tracking-tighter text-white italic">KINETIC<span className="text-red-600">.</span></div>
          <div className="h-6 w-[1px] bg-gray-700"></div>
          <div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-gray-500">Session</h1>
            <p className="text-sm font-semibold">{sessionName} • {trackName}</p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-tight">Local Time</p>
            <p className="text-lg font-mono leading-none">{time}</p>
          </div>
          <div className="bg-red-600 px-3 py-1 rounded-sm animate-pulse">
            <span className="text-[10px] font-bold text-white">LIVE</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-800 p-2 rounded border border-gray-700 hover:bg-gray-700 transition-colors" onClick={() => {
              alert("New notification: VER set the fastest lap! (1:31.987)");
            }}>
              <Bell className="w-4 h-4 text-gray-300" />
            </button>
            <button className="bg-gray-800 p-2 rounded border border-gray-700 hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Area */}
      <main className="flex-1 overflow-auto rounded-lg">
        <Dashboard />
      </main>

      {/* Bottom Nav / Status Bar */}
      <footer className="mt-4 flex justify-between items-center bg-[#111113] border border-gray-800 rounded px-4 py-2 shrink-0">
        <div className="flex gap-6">
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span className="text-[10px] font-bold uppercase text-gray-400">Data Stream Active</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span className="text-[10px] font-bold uppercase text-gray-400">Telemetry Synced</span>
           </div>
        </div>
        <div className="flex gap-4">
          <span className="text-[10px] font-mono text-gray-600">APP VERSION: KINETIC_V2.1.0_PROD</span>
          <span className="text-[10px] font-mono text-gray-600 italic">LATENCY: 14ms</span>
        </div>
      </footer>
    </div>
  );
}
