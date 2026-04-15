/**
 * SpeedSlider.tsx
 * Controls animation speed (1x-10x)
 */

import React from 'react';

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  min?: number;
  max?: number;
}

export const SpeedSlider: React.FC<SpeedSliderProps> = ({
  speed,
  onSpeedChange,
  min = 1,
  max = 10,
}) => {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700">
      <label className="text-sm font-semibold text-gray-300 whitespace-nowrap">
        Speed:
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="flex-1 cursor-pointer"
      />
      <span className="text-sm font-mono text-indigo-400 w-12 text-center">
        {speed}x
      </span>
    </div>
  );
};

export default SpeedSlider;
