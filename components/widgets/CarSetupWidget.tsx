"use client";

import React from 'react';
import WidgetHeader from './WidgetHeader';

export default function CarSetupWidget() {
  return (
    <>
      <WidgetHeader title="Setup Config" />
      <div className="flex-1 overflow-y-auto space-y-4">
        <div>
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Aero Package</p>
          <div className="flex justify-between text-xs mb-1">
             <span className="text-gray-500">Front Wing</span>
             <span className="font-mono">Pos 24.5&deg;</span>
          </div>
          <div className="flex justify-between text-xs">
             <span className="text-gray-500">Rear Wing</span>
             <span className="font-mono">Pos 32.0&deg;</span>
          </div>
        </div>
        
        <div className="h-[1px] bg-gray-800"></div>
        
        <div>
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Tires & Pressures</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
             <div className="bg-black/40 p-2 rounded">
               <p className="text-[8px] text-gray-600">FL</p>
               <p className="text-xs font-mono">22.5 PSI</p>
               <p className="text-[10px] text-green-500">98&deg;C</p>
             </div>
             <div className="bg-black/40 p-2 rounded">
               <p className="text-[8px] text-gray-600">FR</p>
               <p className="text-xs font-mono">22.5 PSI</p>
               <p className="text-[10px] text-green-500">96&deg;C</p>
             </div>
             <div className="bg-black/40 p-2 rounded">
               <p className="text-[8px] text-gray-600">RL</p>
               <p className="text-xs font-mono">21.0 PSI</p>
               <p className="text-[10px] text-yellow-500">104&deg;C</p>
             </div>
             <div className="bg-black/40 p-2 rounded">
               <p className="text-[8px] text-gray-600">RR</p>
               <p className="text-xs font-mono">21.0 PSI</p>
               <p className="text-[10px] text-yellow-500">105&deg;C</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
