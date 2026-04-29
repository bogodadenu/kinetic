import React from 'react';
import { GripHorizontal, Settings, Maximize2 } from 'lucide-react';

interface WidgetHeaderProps {
  title: string;
}

export default function WidgetHeader({ title }: WidgetHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3 shrink-0">
      <div className="flex items-center gap-2">
        <div className="drag-handle cursor-move text-gray-600 hover:text-gray-300 transition-colors">
          <GripHorizontal size={14} />
        </div>
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <button className="hover:text-gray-300 transition-colors">
          <Settings size={12} />
        </button>
        <button className="hover:text-gray-300 transition-colors">
          <Maximize2 size={12} />
        </button>
      </div>
    </div>
  );
}
