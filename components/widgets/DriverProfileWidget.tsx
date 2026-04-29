"use client";

import React from 'react';
import { useF1Store } from '@/store/f1Store';
import WidgetHeader from './WidgetHeader';
import { Share2 } from 'lucide-react';

export default function DriverProfileWidget() {
  const { drivers, selectedDriver } = useF1Store();

  const driver = drivers.find(d => d.driver_number === selectedDriver);

  if (!driver) {
    return (
      <>
        <WidgetHeader title="Driver Profile" />
        <div className="flex-1 flex items-center justify-center text-white/30 font-mono text-sm">
          Select a driver
        </div>
      </>
    );
  }

  const handleShare = () => {
    alert(`Shared ${driver.name_acronym} stats to social media!`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden -m-3">
      <div className="p-3 bg-gradient-to-b from-blue-900/20 to-transparent border-b border-gray-800">
         <div className="flex justify-between items-center mb-2">
           <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Driver Insight</h3>
           <button onClick={handleShare} className="text-gray-500 hover:text-white transition-colors" title="Share stats">
             <Share2 size={12} />
           </button>
         </div>
         <div className="flex items-center gap-3">
           <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0 border-2 overflow-hidden" style={{ borderColor: `#${driver.team_colour}` }}>
             <div className="w-full h-full bg-gradient-to-tr from-gray-800 to-gray-600"></div>
           </div>
           <div>
             <p className="text-sm font-bold leading-tight uppercase">{driver.full_name}</p>
             <p className="text-[10px] text-gray-500 italic">{driver.team_name} • #{driver.driver_number}</p>
           </div>
         </div>
      </div>
      
      <div className="p-3 space-y-3 flex-1 flex flex-col justify-between">
         <div className="flex justify-between text-xs">
           <span className="text-gray-500">Current Position</span>
           <span className="font-mono font-bold">P{driver.position}</span>
         </div>
         <div className="flex justify-between text-xs">
           <span className="text-gray-500">Tyre Age</span>
           <div className="flex items-center gap-1 font-mono text-gray-100">
             <div className={`w-2 h-2 rounded-full border border-gray-700
                  ${driver.tyre_compound === 'SOFT' ? 'bg-red-500' : 
                    driver.tyre_compound === 'MEDIUM' ? 'bg-yellow-400' : 
                    driver.tyre_compound === 'HARD' ? 'bg-white' : 'bg-green-500'}
                `} />
             {driver.tyre_age} Laps
           </div>
         </div>
         <div className="flex justify-between text-xs">
           <span className="text-gray-500">Last Lap</span>
           <span className="font-mono text-purple-400 font-bold">{driver.last_lap_time}</span>
         </div>
         <div className="flex justify-between text-xs">
           <span className="text-gray-500">Best Lap</span>
           <span className="font-mono text-green-400 font-bold">{driver.best_lap_time}</span>
         </div>
         <div className="mt-auto pt-2 border-t border-gray-800">
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold py-2 rounded uppercase tracking-wider transition-colors">
               View Driver History
             </button>
         </div>
      </div>
    </div>
  );
}
