/**
 * SearchingVisualizer.tsx
 * Array visualizer for searching algorithms
 */

import React, { useMemo } from 'react';
import { AlgorithmFrame } from '../../types/AlgorithmFrame';

interface SearchingVisualizerProps {
  frame: AlgorithmFrame | null;
  width?: number;
}

export const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({
  frame,
  width = 800,
}) => {
  if (!frame) {
    return (
      <div className="w-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700 p-8">
        <p className="text-gray-400">No animation data</p>
      </div>
    );
  }

  const { array, highlight } = frame;
  const arrayLength = array.length;

  const cellWidth = useMemo(() => {
    return Math.max(30, Math.floor((width - 40) / arrayLength));
  }, [width, arrayLength]);

  const cellHeight = 60;
  const maxValue = Math.max(...array, 1);

  const getRowClass = (index: number): string => {
    if (highlight.sorted.includes(index)) return 'bg-green-600';
    if (highlight.swapping.includes(index)) return 'bg-red-500';
    if (highlight.comparing.includes(index)) return 'bg-yellow-400';
    return 'bg-indigo-500';
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-6 border border-gray-700">
      {/* Array visualization */}
      <div className="flex gap-1 items-end justify-center flex-wrap bg-gray-950 rounded p-4 border border-gray-700" style={{ minHeight: '150px' }}>
        {array.map((value, index) => {
          const heightPercent = (value / maxValue) * 100;
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-end rounded transition-all ${getRowClass(index)}`}
              style={{
                width: `${cellWidth}px`,
                height: `${Math.max(20, (heightPercent / 100) * cellHeight)}px`,
              }}
            >
              <span className="text-xs font-bold text-white mb-1">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-gray-400 text-xs font-semibold">COMPARISONS</p>
          <p className="text-xl font-bold text-indigo-400">
            {frame.stats.comparisons}
          </p>
        </div>
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-gray-400 text-xs font-semibold">ACCESSES</p>
          <p className="text-xl font-bold text-green-400">
            {frame.stats.accesses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchingVisualizer;
