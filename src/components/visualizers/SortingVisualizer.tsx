/**
 * SortingVisualizer.tsx
 * SVG-based bar chart visualizer for sorting algorithms
 */

import React, { useMemo } from 'react';
import { AlgorithmFrame } from '../../types/AlgorithmFrame';

interface SortingVisualizerProps {
  frame: AlgorithmFrame | null;
  height?: number;
  width?: number;
  showLabels?: boolean;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  frame,
  height = 300,
  width = 800,
  showLabels = true,
}) => {
  if (!frame) {
    return (
      <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
        <p className="text-gray-400">No animation data</p>
      </div>
    );
  }

  const { array, highlight } = frame;
  const arrayLength = array.length;

  const barWidth = useMemo(() => {
    return Math.max(2, Math.floor((width - 40) / arrayLength));
  }, [width, arrayLength]);

  const maxValue = Math.max(...array, 1);

  const getBarClass = (index: number): string => {
    if (highlight.sorted.includes(index)) return 'bar-sorted';
    if (highlight.swapping.includes(index)) return 'bar-swapping';
    if (highlight.comparing.includes(index)) return 'bar-comparing';
    return 'bar-default';
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-6 border border-gray-700">
      <svg
        width={width}
        height={height}
        className="bg-gray-950 rounded border border-gray-700"
      >
        {/* Y-axis */}
        <line
          x1="30"
          y1="20"
          x2="30"
          y2={height - 20}
          stroke="#4b5563"
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1="30"
          y1={height - 20}
          x2={width - 10}
          y2={height - 20}
          stroke="#4b5563"
          strokeWidth="2"
        />

        {/* Grid lines and labels */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = height - 20 - (height - 40) * (percent / 100);
          return (
            <g key={`grid-${percent}`}>
              <line
                x1="25"
                y1={y}
                x2={width - 10}
                y2={y}
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x="5"
                y={y + 4}
                fontSize="10"
                fill="#94a3b8"
                textAnchor="end"
              >
                {percent}%
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {array.map((value, index) => {
          const barHeight = ((value / maxValue) * (height - 40)) || 5;
          const barX = 30 + index * (barWidth + 1);
          const barY = height - 20 - barHeight;

          return (
            <g key={`bar-${index}`}>
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                className={getBarClass(index)}
                rx="2"
              />
              {showLabels && arrayLength <= 30 && (
                <text
                  x={barX + barWidth / 2}
                  y={height - 5}
                  className="bar-label"
                  textAnchor="middle"
                  fontSize="10"
                >
                  {value}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-gray-400 text-xs font-semibold">COMPARISONS</p>
          <p className="text-xl font-bold text-indigo-400">
            {frame.stats.comparisons}
          </p>
        </div>
        <div className="bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-gray-400 text-xs font-semibold">SWAPS</p>
          <p className="text-xl font-bold text-blue-400">{frame.stats.swaps}</p>
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

export default SortingVisualizer;
