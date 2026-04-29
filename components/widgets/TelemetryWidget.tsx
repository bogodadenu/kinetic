"use client";

import React, { useMemo } from 'react';
import { useF1Store } from '@/store/f1Store';
import WidgetHeader from './WidgetHeader';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';

export default function TelemetryWidget() {
  const { telemetryHistory, currentTelemetry, drivers, selectedDriver } = useF1Store();

  const driver = drivers.find(d => d.driver_number === selectedDriver);
  const color = driver ? `#${driver.team_colour}` : "#ff1801";

  const chartData = useMemo(() => {
    return telemetryHistory.map((t, index) => ({
      ...t,
      index,
    }));
  }, [telemetryHistory]);

  return (
    <>
      <WidgetHeader title={`Live Telemetry: Car #${driver?.driver_number || 'N/A'} (${driver?.name_acronym || 'None'})`} />
      <div className="flex-1 flex flex-col p-2">
        <div className="flex justify-between items-center mb-3">
           <div className="flex gap-2 text-[10px] items-center">
             <span className={`px-1 border ${currentTelemetry?.drs ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>DRS {currentTelemetry?.drs ? 'ENABLED' : 'DISABLED'}</span>
           </div>
        </div>
        
        {/* Current status indicators */}
        <div className="grid grid-cols-2 gap-4 h-[180px]">
          <div className="flex flex-col gap-2">
            <div className="flex-1 bg-black/50 rounded flex flex-col justify-end p-2 border border-gray-800">
               <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500 uppercase font-bold tracking-widest">Speed</span><span className="text-white font-mono">{currentTelemetry?.speed || 0} KM/H</span></div>
               <div className="h-1 bg-gray-800 w-full rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 transition-all" style={{ width: `${Math.min(100, ((currentTelemetry?.speed || 0) / 350) * 100)}%` }}></div>
               </div>
            </div>
            <div className="flex-1 bg-black/50 rounded flex flex-col justify-end p-2 border border-gray-800">
               <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500 uppercase font-bold tracking-widest">Throttle</span><span className="text-white font-mono">{currentTelemetry?.throttle || 0}%</span></div>
               <div className="h-1 bg-gray-800 w-full rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 transition-all" style={{ width: `${currentTelemetry?.throttle || 0}%` }}></div>
               </div>
            </div>
            <div className="flex-1 bg-black/50 rounded flex flex-col justify-end p-2 border border-gray-800">
               <div className="flex justify-between text-[10px] mb-1"><span className="text-gray-500 uppercase font-bold tracking-widest">Brake</span><span className="text-white font-mono">{currentTelemetry?.brake || 0}%</span></div>
               <div className="h-1 bg-gray-800 w-full rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 transition-all" style={{ width: `${currentTelemetry?.brake || 0}%` }}></div>
               </div>
            </div>
          </div>
          
          <div className="bg-black/50 rounded flex items-center justify-center flex-col border border-gray-800">
            <div className="text-5xl font-mono font-bold leading-none text-white">{currentTelemetry?.gear || 'N'}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mt-1">Gear</div>
            <div className="mt-4 w-full px-4">
               <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1"><span>RPM</span><span>{currentTelemetry?.rpm || 0}</span></div>
               <div className="flex gap-[2px]">
                 {[...Array(8)].map((_, i) => {
                    const activeRatio = (currentTelemetry?.rpm || 0) / 12500;
                    const isActive = i < activeRatio * 8;
                    const bColor = i < 4 ? 'bg-green-500' : (i < 6 ? 'bg-yellow-500' : 'bg-red-500');
                    return (
                      <div key={i} className={`flex-1 h-3 ${isActive ? bColor : 'bg-gray-800'}`}></div>
                    );
                 })}
               </div>
            </div>
          </div>
        </div>

        {/* Speed Line Chart */}
        <div className="flex-1 mt-4 min-h-[80px] bg-black/50 rounded border border-gray-800 p-2">
          {telemetryHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="index" hide />
                <YAxis domain={[0, 350]} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111113', border: '1px solid #1f2937', borderRadius: '4px' }}
                  itemStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke={color} 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold">
              Waiting for telemetry data...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
