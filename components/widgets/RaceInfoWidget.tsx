"use client";

import React from 'react';
import { useF1Store } from '@/store/f1Store';
import WidgetHeader from './WidgetHeader';
import { Flag, Timer, Zap } from 'lucide-react';

export default function RaceInfoWidget() {
  const { isLive, sessionName, trackName, lap, totalLaps, status } = useF1Store();

  const statusColors = {
    'Green': 'text-green-500',
    'Yellow': 'text-yellow-500',
    'Red': 'text-red-500',
    'VSC': 'text-yellow-400',
    'SC': 'text-orange-500',
    'Finished': 'text-white'
  };

  return (
    <>
      <WidgetHeader title="Session Info" />
      <div className="flex-1 p-2 grid grid-cols-4 gap-4 items-center">
        
        <div className="flex flex-col border-r border-gray-800">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Session</span>
          <span className="text-sm font-bold truncate pr-4">{sessionName}</span>
          <span className="text-xs text-gray-400 truncate pr-4">{trackName}</span>
        </div>

        <div className="flex flex-col border-r border-gray-800 px-4">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Track Status</span>
          <div className="flex items-center gap-2">
            <Flag className={`${statusColors[status]} animate-pulse`} size={16} />
            <span className={`text-sm font-bold font-mono uppercase tracking-wider ${statusColors[status]}`}>{status}</span>
          </div>
        </div>

        <div className="flex flex-col border-r border-gray-800 px-4">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Lap</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono tracking-tighter">{lap}</span>
            <span className="text-xs font-mono text-gray-500">/ {totalLaps}</span>
          </div>
        </div>

        <div className="flex flex-col px-4">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Live Feed</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-gray-700'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{isLive ? 'CONNECTED' : 'OFFLINE'}</span>
          </div>
        </div>

      </div>
    </>
  );
}
