"use client";

import React from 'react';
import { useF1Store } from '@/store/f1Store';
import WidgetHeader from './WidgetHeader';

export default function LiveTimingWidget() {
  const { drivers, selectedDriver, setSelectedDriver, lap, totalLaps } = useF1Store();

  const sortedDrivers = [...drivers].sort((a, b) => a.position - b.position);

  return (
    <>
      <WidgetHeader title={`Live Leaderboard • Lap ${lap}/${totalLaps}`} />
      <div className="flex-1 overflow-auto bg-[#111113]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#111113] z-10 text-[9px] uppercase font-bold text-gray-500 pb-2">
            <tr>
              <th className="py-2 px-2 font-normal w-8 text-center">Pos</th>
              <th className="py-2 px-2 font-normal">Driver</th>
              <th className="py-2 px-2 font-normal text-right">Interval</th>
              <th className="py-2 px-2 font-normal text-right">Last Lap</th>
              <th className="py-2 px-2 font-normal text-right">S</th>
            </tr>
          </thead>
          <tbody className="text-xs font-mono space-y-1">
            {sortedDrivers.map((driver) => {
              const isSelected = driver.driver_number === selectedDriver;
              return (
                <tr 
                  key={driver.driver_number} 
                  onClick={() => setSelectedDriver(driver.driver_number)}
                  className={`border-b-4 border-transparent cursor-pointer transition-colors block md:table-row rounded-sm my-1
                    ${isSelected ? 'bg-[#1A1A1D] border-l-4 border-blue-500' : 'hover:bg-gray-800'}
                  `}
                >
                  <td className="py-2 px-2 text-center text-gray-400">{driver.position}</td>
                  <td className="py-2 px-2 font-bold">
                    <div className="flex items-center gap-2">
                      <span className={isSelected ? 'text-white' : 'text-gray-300'}>
                        {driver.broadcast_name.split(' ').pop()} 
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal underline">{driver.name_acronym}</span>
                    </div>
                  </td>
                  <td className={`py-2 px-2 text-right ${isSelected ? 'text-blue-400' : 'text-gray-300'}`}>
                    {driver.gap_to_leader === 'Leader' ? 'INTERVAL' : driver.interval}
                  </td>
                  <td className="py-2 px-2 text-right text-gray-300">{driver.last_lap_time}</td>
                  <td className="py-2 px-2 text-right">
                    {driver.tyre_compound.charAt(0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-auto border-t border-gray-800 pt-3">
          <h4 className="text-[10px] text-gray-500 font-bold uppercase mb-2">Pit Lane Activity</h4>
          <div className="bg-gray-900 rounded p-2 text-[11px] border border-gray-800">
            <span className="text-blue-400 font-bold">VER</span>: Pit stop successful. 2.2s. <span className="text-gray-500 italic">New Hard Tires.</span>
          </div>
        </div>
      </div>
    </>
  );
}
