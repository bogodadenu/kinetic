"use client";

import React, { useState, useEffect } from "react";
import ReactGridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useF1Store } from "@/store/f1Store";
import LiveTimingWidget from "./widgets/LiveTimingWidget";
import TelemetryWidget from "./widgets/TelemetryWidget";
import TrackMapWidget from "./widgets/TrackMapWidget";
import RaceInfoWidget from "./widgets/RaceInfoWidget";
import DriverProfileWidget from "./widgets/DriverProfileWidget";
import CarSetupWidget from "./widgets/CarSetupWidget";

const Grid = ReactGridLayout as any;

const defaultLayout = [
  { i: "race-info", x: 0, y: 0, w: 12, h: 2, static: false },
  { i: "live-timing", x: 0, y: 2, w: 4, h: 10, static: false },
  { i: "telemetry", x: 4, y: 2, w: 8, h: 6, static: false },
  { i: "track-map", x: 4, y: 8, w: 4, h: 6, static: false },
  { i: "driver-profile", x: 8, y: 8, w: 4, h: 6, static: false },
  { i: "car-setup", x: 0, y: 12, w: 4, h: 4, static: false },
];

export default function Dashboard() {
  const [layout, setLayout] = useState(defaultLayout);
  const [isClient, setIsClient] = useState(false);
  const [width, setWidth] = useState(1200);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Simple width observer for GridLayout
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  if (!isClient) return <div className="h-screen w-full flex items-center justify-center text-white">Initializing Pitwall...</div>;

  return (
    <div className="w-full min-h-[1000px] p-4 overflow-y-auto" ref={containerRef}>
      {/* @ts-ignore */}
      <Grid
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={50}
        width={width - 32} // Account for padding
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
        margin={[16, 16]}
      >
        <div key="race-info" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <RaceInfoWidget />
        </div>
        <div key="live-timing" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <LiveTimingWidget />
        </div>
        <div key="telemetry" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <TelemetryWidget />
        </div>
        <div key="track-map" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <TrackMapWidget />
        </div>
        <div key="driver-profile" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <DriverProfileWidget />
        </div>
        <div key="car-setup" className="bg-[#111113] rounded-lg border border-gray-800 p-3 flex flex-col">
          <CarSetupWidget />
        </div>
      </Grid>
    </div>
  );
}
